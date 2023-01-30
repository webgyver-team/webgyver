package com.ssafy.webgyver.api.request.Seller;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerMypageHistoryPutReq {
    // 글 번호
    private Long idx;
    private String title;
    private String content;
    // seller 인덱스.
    private Long type;
}
