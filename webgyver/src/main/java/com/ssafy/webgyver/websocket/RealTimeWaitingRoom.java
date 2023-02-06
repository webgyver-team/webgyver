package com.ssafy.webgyver.websocket;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.java.Log;

import javax.websocket.Session;
import java.util.Set;

@Log
@ToString
@Getter
@Setter
public class RealTimeWaitingRoom {
    Set<Session> customerSession;
    Set<Session> sellerSession;
    // 소비자는 들어올때 ArticleIdx, Price, 위도, 경도를 들고 들어와야함
    // 판매자는 들어올때 위도, 경도를 들고 들어와야함

}
