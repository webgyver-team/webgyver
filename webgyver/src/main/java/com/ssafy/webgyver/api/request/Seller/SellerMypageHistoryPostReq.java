package com.ssafy.webgyver.api.request.Seller;

import com.ssafy.webgyver.db.entity.Article;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerMypageHistoryPostReq {
    private String title;
    private String content;
    // seller 인덱스.
    private Long type;
}
