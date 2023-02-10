package com.ssafy.webgyver.api.request.seller;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerAcceptReservationReq {
    private Long idx;
    private boolean acceptFlag;
}
