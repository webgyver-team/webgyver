package com.ssafy.webgyver.api.request.seller;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerExchangeReq {
    private Long sellerIdx;
    private Integer point;
}
