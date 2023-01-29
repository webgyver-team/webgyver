package com.ssafy.webgyver.api.response.Seller;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public class SellerCheckDuplicateRes extends BaseResponseBody {
    public static SellerCheckDuplicateRes of(Integer statusCode, String message) {
        SellerCheckDuplicateRes res = new SellerCheckDuplicateRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
