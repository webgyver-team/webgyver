package com.ssafy.webgyver.api.request.seller;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerCommentModifyReq {
    Long sellerIdx;
    Long commentIdx;
    String commentContent;
}
