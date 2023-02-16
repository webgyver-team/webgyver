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
        sessions = Collections.synchronizedSet(new HashSet<>());
    }

    public Map<String, Object> roomInfo() {
        Map<String, Object> res = new HashMap<>();
        for (Session session : sessions) {
            String key1 = (String) session.getUserProperties().get("type");
            String key2 = String.valueOf((long) session.getUserProperties().get("idx"));
            res.put(key1 + "-" + key2, "");
        }
        return res;
    }

    public synchronized void join(Session session) throws IOException {
        // 이미 접속한 다른 세션이 있으면 강제 종료함.
        Set<Session> willDie = new HashSet<>();
        for (Session other : sessions) {
            if (other.getUserProperties().get("type").equals(session.getUserProperties().get("type"))) {
                if (other.getUserProperties().get("idx").equals(session.getUserProperties().get("idx"))) {
                    willDie.add(other);
                }
            }
        }
        for (Session other : willDie) {
            if (other.isOpen())
                other.close();
        }
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

    public synchronized void sendMessageOther(String msg, Session me) {
        for (Session session : sessions) {
            if (session.getId().equals(me.getId()) || !session.isOpen())
                continue;
            sendMessage(msg, session);
        }

    }

    public synchronized void sendMessage(String msg, Session session) {
        try {
            session.getBasicRemote().sendText(msg);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void explore() throws IOException {
        Set<Session> copySessions = new HashSet<>(sessions);
        for (Session session : copySessions) {
            leave(session);
            session.close();
        }

    }
}

