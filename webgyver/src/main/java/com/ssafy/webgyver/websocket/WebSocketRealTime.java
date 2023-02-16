package com.ssafy.webgyver.websocket;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.service.common.CommonService;
import com.ssafy.webgyver.api.service.common.SmsService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.config.WebSocketConfig;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.util.CommonUtil;
import com.ssafy.webgyver.websocket.dto.Message;
import com.ssafy.webgyver.websocket.dto.MethodType;
import com.ssafy.webgyver.websocket.dto.RefreshCustomerMessage;
import com.ssafy.webgyver.websocket.dto.RefreshSellerMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Log
@Component
@ServerEndpoint(value = "/realtime/{type}/{idx}", configurator = WebSocketConfig.class)
@RequiredArgsConstructor
public class WebSocketRealTime {
    private final CommonService commonService;

    private final SmsService smsService;

    @Value("${properties.file.toss.secret}")
    String tossKey;

    // MAP으로 리팩토링 필요함~
    private static final Set<Session> customerSession = Collections.synchronizedSet(new HashSet<>());
    private static final Set<Session> sellerSession = Collections.synchronizedSet(new HashSet<>());
    private static List<RefreshSellerMessage> refreshSellerMessageList = Collections.synchronizedList(new ArrayList<>());

    @OnOpen
    public void onOpen(Session session, @PathParam("type") String type, @PathParam("idx") Long idx) throws IOException {
        if (type.equals("customer")) {
            customerSession.add(session);
        } else if (type.equals("seller")) {
            sellerSession.add(session);
        }
        session.getUserProperties().put("type", type);
        session.getUserProperties().put("idx", idx);

    }

    @OnClose
    public void OnClose(Session session, CloseReason closeReason) throws IOException {
        if ("customer".equals(session.getUserProperties().get("type"))) {
            customerSession.remove(session);
            updateRefreshSellerMessageList();
            refreshSellerAllSeller();
        } else if ("seller".equals(session.getUserProperties().get("type"))) {
            sellerSession.remove(session);
            refreshCustomerAllCustomer();
        }
    }

    @OnMessage
    public void onMessage(String jsonMessage, Session session) throws IOException {
        // 소비자는 들어올때 글정보, 가격, 카테고리인덱스, 위도, 경도, 몇km반경까지 볼건지를 들고 들어와야함
        // 판매자는 들어올때 위도, 경도를 들고 들어와야함

        Gson gson = new Gson();
        Map<String, Object> info = gson.fromJson(jsonMessage, new TypeToken<Map<String, Object>>() {
        }.getType());
        System.out.println(info);
        // 리플렉션도 추가해보자.
        // Class<?> cls = Class.forName(obj.getClass().getName());
        MethodType method = MethodType.valueOf((String) info.remove("method"));
        if (method == null) {
            session.getBasicRemote().sendText("메세지 형식을 지켜주세요.");
            return;
        }
        switch (method) {
            case INIT:
                METHOD_INIT(session, info);
                break;
            case CHANGE_DISTANCE:
                METHOD_CHANGE_DISTANCE(session, info);
                break;
            case MAKE_RESERVATION:
                METHOD_MAKE_RESERVATION(session, info);
                break;
        }
    }

    // 실시간 상담 reservation 테이블에 등록!!!!!!!
    public void METHOD_MAKE_RESERVATION(Session seller, Map<String, Object> info) throws IOException {
        long sellerIdx = (long) seller.getUserProperties().get("idx");
        long customerIdx = Math.round((double) info.get("customerIdx"));

        Session customer = null;
        for (Session session : customerSession) {
            if (customerIdx == (long) session.getUserProperties().get("idx")) {
                customer = session;
                break;
            }
        }


        // 결제부터 하고, 예약, 아티클, 이미지 넣기, MAP으로 다시 고쳐야함.
        RefreshSellerMessage reservationInfo = null;
        for (RefreshSellerMessage cur : refreshSellerMessageList) {
            if (cur.getIdx() == customerIdx) {
                reservationInfo = cur;
                break;
            }
        }

        Customer customerForPay = commonService.getCustomer(customerIdx);

        // 소비자 주소 저장
//


        BaseResponseBody responseBody = CommonUtil.requestPay(tossKey, customerForPay.getCustomerKey(), customerForPay.getBillingKey(), reservationInfo.getTitle(), reservationInfo.getPrice());
        System.out.println(responseBody.getStatusCode());
        System.out.println(responseBody.getMessage());

        // 실시간 상담 reservation 테이블에 등록!!!!!!!
        Reservation insertedRes = commonService.insertReservationArticlePictureList(customerIdx, sellerIdx, reservationInfo);
        long reservationIdx = insertedRes.getIdx();
        Message message = new Message(MethodType.GO_FACE_TIME);
        Map<String, Object> data = new HashMap<>();
        data.put("customerIdx", customerIdx);
        data.put("sellerIdx", sellerIdx);
        data.put("reservationIdx", reservationIdx);
        message.setData(data);
        Gson gson = new Gson();
        String messageString = gson.toJson(message);

        customer.getBasicRemote().sendText(messageString);
        seller.getBasicRemote().sendText(messageString);

        StringBuilder customerStringBuiler = new StringBuilder();
        StringBuilder sellerStringBuiler = new StringBuilder();

        customerStringBuiler.append("[Webgyver]").append('\n')
                .append("문의하신 실시간 상담 [").append(reservationInfo.getTitle()).append("]의 상담이 성사되어")
                .append("등록하신 카드로 ").append(reservationInfo.getPrice()).append("원이 결제완료 되었습니다.");

        sellerStringBuiler.append("[Webgyver]").append('\n')
                .append("실시간 상담 [").append(reservationInfo.getTitle()).append("]의 상담이 성사되어")
                .append("결제금액 ").append(reservationInfo.getPrice()).append("원이 적립되었습니다.");

        Seller sellerInfo = commonService.getSeller(sellerIdx);

        smsService.onSendMessage(customerForPay.getPhoneNumber(), customerStringBuiler.toString());
        smsService.onSendMessage(sellerInfo.getPhoneNumber(), sellerStringBuiler.toString());

        sellerInfo.updatePoint(reservationInfo.getPrice());
        commonService.setSeller(sellerInfo);

//        System.out.println(messageString);

//
//        System.out.println(reservation);
//        System.out.println(article);
//        System.out.println(pictureList);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
        log.warning("onError:" + throwable.getMessage());
    }

    public void setStatus(Session session, Map<String, Object> info) {
        for (String key : info.keySet()) {
            session.getUserProperties().put(key, info.get(key));
        }
    }

    // seller가 들어오거나 나갈때 customer에게 정보 갱신해주자
    public void refreshCustomerAllCustomer() throws IOException {
        for (Session customer : customerSession) {
            refreshCustomerOneCustomer(customer);
        }
    }

    public void refreshCustomerOneCustomer(Session customer) throws IOException {
        if (!customer.isOpen())
            return;
        Gson gson = new Gson();
        Map<String, Object> customerProperties = customer.getUserProperties();
        int viewDistance = (int) Math.round(Double.valueOf((String) customerProperties.get("viewDistance")));
        int sellerCnt = 0;

        if (viewDistance == -1) {
            // 거리 무관으로 설정한 경우.
            sellerCnt = (int) sellerSession.stream().filter(Session::isOpen).count();
        } else {
            double lat1 = Double.valueOf((String) customerProperties.get("lat"));
            double lng1 = Double.valueOf((String) customerProperties.get("lng"));
            for (Session seller : sellerSession) {
                Map<String, Object> sellerProperties = seller.getUserProperties();
                double lat2 = 0;
                double lng2 = 0;
                try {
                    lat2 = Double.valueOf((String) sellerProperties.get("lat"));
                    lng2 = Double.valueOf((String) sellerProperties.get("lng"));
                } catch (Exception e) {
                    lat2 = (double) sellerProperties.get("lat");
                    lng2 = (double) sellerProperties.get("lng");
                }
                double distance = CommonUtil.getDistanceWithKM(lat1, lng1, lat2, lng2);
                if (distance <= viewDistance) {
                    sellerCnt += 1;
                }
            }
        }
        RefreshCustomerMessage refreshCustomerMessage = new RefreshCustomerMessage(sellerCnt, viewDistance);
        customer.getBasicRemote().sendText(gson.toJson(refreshCustomerMessage));
    }

    // customer가 들어오거나 나갈때 refreshSellerList를 업데이트해주자.
    public void updateRefreshSellerMessageList() throws IOException {
        refreshSellerMessageList = Collections.synchronizedList(new ArrayList<>());
        Gson gson = new Gson();
        for (Session customer : customerSession) {
            if (!customer.isOpen()) {
                continue;
            }
            Map<String, Object> customerProperties = customer.getUserProperties();
            RefreshSellerMessage refreshSellerMessage = RefreshSellerMessage.builder()
                    .lat((String) customerProperties.get("lat"))
                    .lng((String) customerProperties.get("lng"))
                    .title((String) customerProperties.get("title"))
                    .content((String) customerProperties.get("content"))
                    .address((String) customerProperties.get("address"))
                    .detailAddress((String) customerProperties.get("detailAddress"))
                    .price((int) Math.round((double) customerProperties.get("price")))
                    .images(gson.fromJson(gson.toJson(customerProperties.get("images")), new TypeToken<List<PictureReq>>() {
                    }.getType()))
                    .idx((long) customerProperties.get("idx"))
                    .categoryIdx(Math.round(Double.valueOf((String) customerProperties.get("categoryIdx"))))
                    .build();

            refreshSellerMessageList.add(refreshSellerMessage);
        }
    }

    public void refreshSellerAllSeller() {
        Gson gson = new Gson();
        String refreshSellerMessageListJson = gson.toJson(refreshSellerMessageList);
        sellerSession.stream().filter(Session::isOpen).forEach(seller -> {
            try {
                seller.getBasicRemote().sendText(refreshSellerMessageListJson);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    public void refreshSellerOneSeller(Session session) throws IOException {
        Gson gson = new Gson();
        String refreshSellerMessageListJson = gson.toJson(refreshSellerMessageList);
        session.getBasicRemote().sendText(refreshSellerMessageListJson);
    }

    public void METHOD_INIT(Session session, Map<String, Object> info) throws IOException {

        setStatus(session, info);
        updateRefreshSellerMessageList();

        if ("seller".equals(session.getUserProperties().get("type"))) {
            refreshSellerOneSeller(session);
            refreshCustomerAllCustomer();
        } else if ("customer".equals(session.getUserProperties().get("type"))) {
            Customer customer = commonService.getCustomer((long) session.getUserProperties().get("idx"));
            customer.setAddress((String) session.getUserProperties().get("address"));
            customer.setDetailAddress((String) session.getUserProperties().get("detailAddress"));
            customer.setLat(Double.valueOf((String) session.getUserProperties().get("lat")));
            customer.setLng(Double.valueOf((String) session.getUserProperties().get("lng")));
            commonService.saveCustomer(customer);

            refreshCustomerOneCustomer(session);
            refreshSellerAllSeller();
        }
    }

    public void METHOD_CHANGE_DISTANCE(Session session, Map<String, Object> info) throws IOException {
        session.getUserProperties().put("viewDistance", String.valueOf(info.get("viewDistance")));
        refreshCustomerAllCustomer();
    }
}
