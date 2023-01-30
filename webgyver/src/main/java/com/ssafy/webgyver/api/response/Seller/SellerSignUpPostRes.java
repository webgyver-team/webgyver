package com.ssafy.webgyver.api.response.Seller;

import com.ssafy.webgyver.api.response.test.MemberSignUpPostRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public class SellerSignUpPostRes extends BaseResponseBody {
    public static SellerSignUpPostRes of(Integer statusCode, String message) {
        SellerSignUpPostRes res = new SellerSignUpPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
