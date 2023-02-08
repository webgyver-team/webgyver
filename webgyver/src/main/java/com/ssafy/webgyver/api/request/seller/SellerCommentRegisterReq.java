package com.ssafy.webgyver.api.request.seller;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerCommentRegisterReq {
    private Long sellerIdx;
    private Long reservationIdx;
    private String comment;
}
