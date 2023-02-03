package com.ssafy.webgyver.api.request.customer;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerReservationNormalListReq {
    private Long categoryIdx;
    //    private String address;
//    private String detailAddress;
    private Double lat;
    private Double lng;
    private String date;
}
