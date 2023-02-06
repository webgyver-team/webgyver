package com.ssafy.webgyver.websocket.dto;

import lombok.*;

import java.util.List;

// 실시간 매칭에 접속해있는 seller에게 보내줄 유저의 문의글 정보 등.
@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class RefreshSellerMessage {
    private double lat;
    private double lng;
    private String fullAddress;
    private String title;
    private String content;
    private List<String> images;
    private int price;
}
