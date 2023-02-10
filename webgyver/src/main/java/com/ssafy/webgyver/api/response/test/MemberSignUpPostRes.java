package com.ssafy.webgyver.api.response.test;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public class MemberSignUpPostRes extends BaseResponseBody {
    public static MemberSignUpPostRes of(Integer statusCode, String message) {
        MemberSignUpPostRes res = new MemberSignUpPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
