package com.ssafy.webgyver.api.request.customer;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpPostReq {
    private String id;
    private String password;
    private String name;
    private String birthDay;
    private String phoneNumber;
    private String cardNumber;
    private String cardCvc;
    private String cardValidity;

}
