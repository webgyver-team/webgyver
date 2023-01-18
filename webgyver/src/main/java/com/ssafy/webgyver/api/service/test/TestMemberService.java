package com.ssafy.webgyver.api.service.test;

import com.ssafy.webgyver.api.request.UserRegisterPostReq;
import com.ssafy.webgyver.db.entity.test.TestMember;

public interface TestMemberService {
    TestMember createTestMember(UserRegisterPostReq userRegisterInfo);
    TestMember getUserByUserId(String userId);
}
