package com.ssafy.webgyver.api.response.test;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.test.TestMember;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginPostRes extends BaseResponseBody {
    String accessToken;
    TestMember member;

    public static MemberLoginPostRes of(Integer statusCode, String message, String accessToken, TestMember member) {
        MemberLoginPostRes res = new MemberLoginPostRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setMember(member);
        return res;
    }
}
