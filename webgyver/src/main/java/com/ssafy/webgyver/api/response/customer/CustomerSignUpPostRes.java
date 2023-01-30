package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public class CustomerSignUpPostRes extends BaseResponseBody {
    public static CustomerSignUpPostRes of(Integer statusCode, String message) {
        CustomerSignUpPostRes res = new CustomerSignUpPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
