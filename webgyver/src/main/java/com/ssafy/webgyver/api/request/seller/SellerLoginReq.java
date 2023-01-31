package com.ssafy.webgyver.api.request.seller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerLoginReq {
    private String id;
    private String password;
}
