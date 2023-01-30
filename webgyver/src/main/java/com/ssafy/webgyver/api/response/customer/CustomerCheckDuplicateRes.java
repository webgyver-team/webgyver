package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public class CustomerCheckDuplicateRes extends BaseResponseBody {
    public static CustomerCheckDuplicateRes of(Integer statusCode, String message) {
        CustomerCheckDuplicateRes res = new CustomerCheckDuplicateRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
