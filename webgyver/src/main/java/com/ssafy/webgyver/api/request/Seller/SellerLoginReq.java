package com.ssafy.webgyver.api.request.Seller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerLoginReq {
    private String id;
    private String password;
}
