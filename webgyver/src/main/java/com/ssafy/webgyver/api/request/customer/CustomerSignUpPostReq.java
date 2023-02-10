package com.ssafy.webgyver.api.request.customer;

import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.entity.test.RoleType;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
