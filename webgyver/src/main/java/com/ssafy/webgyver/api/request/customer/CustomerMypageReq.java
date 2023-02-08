package com.ssafy.webgyver.api.request.customer;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMypageReq {
    Long idx;
    String name;
    String phoneNumber;
    String birthDay;
    String cardNumber;
    String cardValidity;
    String password;
}
