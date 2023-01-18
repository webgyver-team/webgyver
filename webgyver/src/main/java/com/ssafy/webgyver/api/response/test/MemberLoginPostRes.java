package com.ssafy.webgyver.api.response.test;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginPostRes extends BaseResponseBody {
    String accessToken;

    public static MemberLoginPostRes of(Integer statusCode, String message, String accessToken) {
        MemberLoginPostRes res = new MemberLoginPostRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}
