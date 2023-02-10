package com.ssafy.webgyver.api.service.test;

import com.ssafy.webgyver.api.request.UserRegisterPostReq;
import com.ssafy.webgyver.api.request.test.MemberLoginPostReq;
import com.ssafy.webgyver.api.request.test.MemberSignUpPostReq;
import com.ssafy.webgyver.db.entity.test.TestMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface TestMemberService {
    TestMember createTestMember(MemberSignUpPostReq userRegisterInfo);
    TestMember getTestMemberByMemberId(Long userId);

    TestMember loginTestMember(MemberLoginPostReq memberLoginInfo);
}
