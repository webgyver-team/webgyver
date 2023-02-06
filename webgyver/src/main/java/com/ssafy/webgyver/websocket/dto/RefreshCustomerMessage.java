package com.ssafy.webgyver.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// 실시간 매칭에 접속해있는 사용자에게 보내줄 셀러의 정보.
@Getter
@Setter
@AllArgsConstructor
public class RefreshCustomerMessage {
    private int sellerCnt;
    private int viewDistance;
}
