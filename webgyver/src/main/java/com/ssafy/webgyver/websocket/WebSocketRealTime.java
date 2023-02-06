package com.ssafy.webgyver.websocket;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.ssafy.webgyver.config.WebSocketConfig;
import com.ssafy.webgyver.util.CommonUtil;
import com.ssafy.webgyver.websocket.dto.RefreshCustomerMessage;
import com.ssafy.webgyver.websocket.dto.RefreshSellerMessage;
import lombok.extern.java.Log;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Log
@Component
@ServerEndpoint(value = "/realtime/{type}/{idx}", configurator = WebSocketConfig.class)
public class WebSocketRealTime {
    private static final Set<Session> customerSession = Collections.synchronizedSet(new HashSet<>());
    private static final Set<Session> sellerSession = Collections.synchronizedSet(new HashSet<>());
    private static final List<RefreshSellerMessage> refreshSellerMessageList = Collections.synchronizedList(new ArrayList<>());
    // 소비자는 들어올때 글정보, Price, 위도, 경도, 몇km반경까지 볼건지를 들고 들어와야함
    // 판매자는 들어올때 위도, 경도를 들고 들어와야함

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
            refreshSeller();
        } else if ("seller".equals(session.getUserProperties().get("type"))) {
            sellerSession.remove(session);
            refreshCustomer();
        }
    }

    @OnMessage
    public void onMessage(String jsonMessage, Session session) throws IOException {
        Gson gson = new Gson();
        Map<String, Object> info = gson.fromJson(jsonMessage, new TypeToken<Map<String, Object>>() {
        }.getType());
        String method = (String) info.remove("method");

        if (method.equals("INIT")) {
            setStatus(session, info);
            if ("seller".equals(session.getUserProperties().get("type"))) {
                refreshCustomer();
            } else if ("customer".equals(session.getUserProperties().get("type"))) {
                refreshSeller();
            }
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        log.warning("onError:" + throwable.getMessage());
    }

    public void setStatus(Session session, Map<String, Object> info) {
        for (String key : info.keySet()) {
            session.getUserProperties().put(key, info.get(key));
        }
    }

    // seller가 들어올때, customer에게 정보 갱신해주자
    public void refreshCustomer() throws IOException {
        Gson gson = new Gson();
        for (Session customer : customerSession) {
            if (!customer.isOpen())
                continue;
            Map<String, Object> customerProperties = customer.getUserProperties();
            int viewDistance = (int) Math.round((double) customerProperties.get("viewDistance"));
            int sellerCnt = 0;

            if (viewDistance == -1) {
                // 거리 무관으로 설정한 경우.
                sellerCnt = (int) sellerSession.stream().filter(Session::isOpen).count();
            } else {
                double lat1 = (double) customerProperties.get("lat");
                double lng1 = (double) customerProperties.get("lng");
                for (Session seller : sellerSession) {
                    Map<String, Object> sellerProperties = seller.getUserProperties();
                    double lat2 = (double) sellerProperties.get("lat");
                    double lng2 = (double) sellerProperties.get("lng");
                    double distance = CommonUtil.getDistanceWithKM(lat1, lng1, lat2, lng2);
                    if (distance <= viewDistance) {
                        sellerCnt += 1;
                    }
                }
            }
            RefreshCustomerMessage refreshCustomerMessage = new RefreshCustomerMessage(sellerCnt, viewDistance);
            customer.getBasicRemote().sendText(gson.toJson(refreshCustomerMessage));
        }
    }

    public void refreshSeller() throws IOException {
        Gson gson = new Gson();

        for (Session customer : customerSession) {
            if (!customer.isOpen()) {
                continue;
            }
            Map<String, Object> customerProperties = customer.getUserProperties();
            RefreshSellerMessage refreshSellerMessage = RefreshSellerMessage.builder()
                    .lat((double) customerProperties.get("lat"))
                    .lng((double) customerProperties.get("lng"))
                    .title((String) customerProperties.get("title"))
                    .content((String) customerProperties.get("content"))
                    .fullAddress((String) customerProperties.get("fullAddress"))
                    .price((int) Math.round((double) customerProperties.get("price")))
                    .images((List<String>) customerProperties.get("images"))
                    .build();
            refreshSellerMessageList.add(refreshSellerMessage);
        }
        String refreshSellerMessageListJson = gson.toJson(refreshSellerMessageList);
        sellerSession.stream().filter(Session::isOpen).forEach(seller -> {
            try {
                seller.getBasicRemote().sendText(refreshSellerMessageListJson);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

}
