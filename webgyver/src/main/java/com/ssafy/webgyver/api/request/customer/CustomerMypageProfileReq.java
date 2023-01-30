package com.ssafy.webgyver.api.request.customer;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMypageProfileReq {
    Long idx;
    String name;
    String phoneNumber;
    String birth;
    String cardNumber;
}
