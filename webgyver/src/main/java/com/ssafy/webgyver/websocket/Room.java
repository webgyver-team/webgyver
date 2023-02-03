package com.ssafy.webgyver.websocket;


import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.java.Log;

import javax.websocket.Session;
import java.io.IOException;
import java.util.*;

@Log
@ToString
@Getter
@Setter
public class Room {
    static final String sep = "1q2w3e4r";
    private Long customerIdx;
    private Long sellerIdx;
    private Reservation reservation;
    Set<Session> sessions;

    public Room(Reservation reservation) {
        this(reservation.getCustomer().getIdx(), reservation.getSeller().getIdx());
        this.reservation = reservation;
    }

    public Room(Long customerIdx, Long sellerIdx) {
        this.customerIdx = customerIdx;
        this.sellerIdx = sellerIdx;
//        this.enterCode = makeEnterCode(String.valueOf(customerIdx), String.valueOf(sellerIdx));
        sessions = Collections.synchronizedSet(new HashSet<>());
    }

    public Map<String, Object> roomInfo() {
        Map<String, Object> res = new HashMap<>();
        for (Session session : sessions) {
            res.put((String) session.getUserProperties().get("name"), session.getUserProperties());
        }
        res.put("sellerName", reservation.getSeller().getName());
        res.put("customerName", reservation.getCustomer().getName());
        res.put("예약시간", reservation.getReservationTime());
        res.put("예약가격", reservation.getReservationPrice());
        return res;
    }

    public synchronized void join(Session session) {
        sessions.add(session);
    }

    public synchronized void leave(Session session) {
        sessions.remove(session);
    }

    public synchronized void sendMessage(String msg) {
        for (Session session : sessions) {
            if (session.isOpen()) {
                sendMessage(msg, session);
            }
        }
    }

    public synchronized void sendMessage(String msg, Session session) {
        try {
            session.getBasicRemote().sendText(msg);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

//    static String makeEnterCode(String cIdx, String sIdx) {
//        return cIdx + sep + sIdx;
//    }


}

