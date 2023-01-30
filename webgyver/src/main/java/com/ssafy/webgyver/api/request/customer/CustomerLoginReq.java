package com.ssafy.webgyver.api.request.customer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerLoginReq {
    private String id;
    private String password;
}
