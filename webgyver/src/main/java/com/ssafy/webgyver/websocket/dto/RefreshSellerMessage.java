package com.ssafy.webgyver.websocket.dto;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import lombok.*;

import java.util.List;

// 실시간 매칭에 접속해있는 seller에게 보내줄 유저의 문의글 정보 등.
@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class RefreshSellerMessage {
    // 커스터머의 인덱스
    private long idx;
    private double lat;
    private double lng;
    private String address;
    private String detailAddress;
    private String title;
    private String content;
    private List<PictureReq> images;
    private int price;
    private long categoryIdx;
}
