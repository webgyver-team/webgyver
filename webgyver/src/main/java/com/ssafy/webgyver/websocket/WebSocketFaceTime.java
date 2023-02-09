package com.ssafy.webgyver.websocket;


import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.ssafy.webgyver.api.service.common.ReservationService;
import com.ssafy.webgyver.config.WebSocketConfig;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.util.MessageParsingUtil;
import com.ssafy.webgyver.util.TimeUtil;
import com.ssafy.webgyver.websocket.dto.Message;
import com.ssafy.webgyver.websocket.dto.MethodType;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.java.Log;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Log
@Component
@ServerEndpoint(value = "/facetime/{type}/{idx}/{reservationIdx}", configurator = WebSocketConfig.class)
@RequiredArgsConstructor
public class WebSocketFaceTime {
    @Value("${explore.machine.start.flag}")
    String startFlag;
    @Value("${explore.machine.fresh.second}")
    String freshSecond;

    private static final Map<Long, Room> rooms = Collections.synchronizedMap(new HashMap<Long, Room>());
    private final ReservationService reservationService;
    private static boolean runCheck = false;
    private final Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session, @PathParam("type") String type, @PathParam("idx") Long idx, @PathParam("reservationIdx") Long reservationIdx) throws IOException {
        // 폭발머신 출동!!!!!
        startExplosionMachine();

        if (!rooms.containsKey(reservationIdx)) {
            System.out.println("noReservationIdx");
            Reservation reservation = reservationService.getReservation(reservationIdx);
            // 올바르지 않은 입력일때 1. 예약번호 잘못 입력함
            if (reservation == null) {
                session.close();
                return;
            }
            addRoom(reservation);
        }

        // 올바르지 않은 입력일때2
        // ex) reservationIdx = 100, customerIdx = 1, sellerIdx = 2일때
        // 100번 예약으로 6번 소비자가 왔다던가, 1번 판매자가 왔다던가 등..
        Room room = rooms.get(reservationIdx);
        if ((type.equals("seller") && room.getSellerIdx() != idx) || (type.equals("partner") && room.getCustomerIdx() != idx)) {
            String msg = "해당 방에 입장할수 있는 권한이 없습니다.";
            System.out.println(msg);
            session.getBasicRemote().sendText(msg);
            CloseReason closeReason = new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, msg);
            session.close(closeReason);
            return;
        }

        // 이제 입장!, 세션에 정보 할당한 뒤에 room에 join하면 다른 세션은 죽여줌.
        session.getUserProperties().put("room", room);
        session.getUserProperties().put("type", type);
        session.getUserProperties().put("idx", idx);
        session.getUserProperties().put("reservationIdx", reservationIdx);
        room.join(session);

        Message message = null;
        if (room.sessions.size() == 1) {
            message = new Message(MethodType.ALONE);
        } else if (room.sessions.size() == 2) {
            message = new Message(MethodType.TOGETHER);
            // 여기서부터 화상통화 시작하면 됨

        }
        session.getBasicRemote().sendText(new Gson().toJson(message));

//        if (type.equals("selelr")) {
//            Seller seller = sellerRepository.findById(idx).get();
//            session.getUserProperties().put("object", seller);
//            session.getUserProperties().put("name", seller.getName());
//        } else if (type.equals("customer")) {
//            Customer customer = customerRepository.findById(idx).get();
//            session.getUserProperties().put("object", customer);
//            session.getUserProperties().put("name", customer.getName());
//        }

    }

    @OnClose
    public void OnClose(Session session, CloseReason closeReason) throws IOException {
        if (closeReason.getCloseCode() == CloseReason.CloseCodes.CANNOT_ACCEPT) {
            System.out.println(closeReason.getCloseCode());
            System.out.println(closeReason.getReasonPhrase());
            return;
        }

        Room room = extractRoom(session);
        if (room == null)
            return;
        room.leave(session);
        if (room.sessions.size() == 0) {
            rooms.remove(room.getReservation().getIdx());
            System.out.println("모든 유저가 나갔으므로 방 자체를 삭제합니다.");
        }
    }

    @OnMessage
    public void onMessage(String jsonMessage, Session session) throws IOException {
        Gson gson = new Gson();
        Map<String, Object> info = gson.fromJson(jsonMessage, new TypeToken<Map<String, Object>>() {
        }.getType());
        System.out.println(info);
        Room room = extractRoom(session);
//        room.sendMessage(jsonMessage);
        MethodType method = MethodType.valueOf((String) info.remove("method"));
        if (method == null) {
            session.getBasicRemote().sendText("메세지 형식을 지켜주세요.");
            return;
        }
//        room.sendMessageOther(jsonMessage, session);
        Map<String, Object> reply = new HashMap<>();
        switch (method) {
            case WANT_MEET:
                reply.put("method", MethodType.WANT_MEET);
                break;
            case ACCEPT_MEET:
                // 판매자의 방문요청 수락.
                // 예약테이블에서 정보 꺼내와서 time, state 바꿔야함.
                String stringTime = (String) info.get("time");
                LocalDateTime time = TimeUtil.string2Time(stringTime);
                ACCEPT_MEET(room, time);
                reply.put("method", MethodType.ACCEPT_MEET);
                reply.put("time", stringTime);
                break;
        }
        System.out.println(reply);
        room.sendMessageOther(gson.toJson(reply), session);
    }

    public void ACCEPT_MEET(Room room, LocalDateTime time) {
        long reservationIdx = room.getReservation().getIdx();
        reservationService.updateReservation2Meet(reservationIdx, time);

    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        log.warning("onError:" + throwable.getMessage());
    }

    public Room extractRoom(Session session) {
        Long reservationIdx = (Long) session.getUserProperties().get("reservationIdx");
        if (reservationIdx == null)
            return null;

        return rooms.get(reservationIdx);
    }

    public void addRoom(Reservation reservation) {
        System.out.println("방 추가 요청!!!");
        Room room = new Room(reservation);
        if (!rooms.containsKey(reservation.getIdx())) {
            rooms.put(reservation.getIdx(), room);
            System.out.println(room);
        }
    }

    public void deleteRoom(Reservation reservation) {
        long reservationIdx = reservation.getIdx();
        rooms.remove(reservationIdx);
    }

    public Map<String, Object> roomInfo(long reservationIdx) {
        addRoom(reservationService.getReservation(reservationIdx));
        return rooms.get(reservationIdx).roomInfo();
    }

    public void startExplosionMachine() {
        if (!runCheck) {
            TimerTask task = new TimerTask() {
                @SneakyThrows
                @Override
                public void run() {
                    System.out.println("폭발머신 가동중!!!!!!!!!!!!!!!!");
                    Set<Long> roomsKeySet = new HashSet<>(rooms.keySet());
                    for (long key : roomsKeySet) {
                        System.out.println(key + "번방 검사중...");
                        Room room = rooms.get(key);
                        LocalDateTime explorerReservationTime = room.getReservation().getReservationTime().plusMinutes(15);
                        if (LocalDateTime.now().isAfter(explorerReservationTime)) {
                            Map<String, Object> reply = new HashMap<>();
                            reply.put("method", MethodType.TIME_OUT);
                            reply.put("msg", "시간종료!! 폭팔!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                            room.sendMessage(gson.toJson(reply));
                            room.explore();
                            rooms.remove(key);
                        }
                    }
                }
            };
            runCheck = true;
            Timer timer = new Timer(true);
            LocalDateTime now = LocalDateTime.now();
            Date first = Date.from(now.withMinute((now.getMinute() / Integer.valueOf(startFlag) + 1) * Integer.valueOf(startFlag)).withSecond(0).atZone(ZoneId.systemDefault()).toInstant());
            System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.out.println(first);
//            timer.schedule(task, first, Integer.valueOf(freshSecond) * 1000);
        }
    }
}