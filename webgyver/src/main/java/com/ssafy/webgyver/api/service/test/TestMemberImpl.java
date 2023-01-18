package com.ssafy.webgyver.api.service.test;

import com.ssafy.webgyver.api.request.UserRegisterPostReq;
import com.ssafy.webgyver.db.entity.test.TestMember;
import com.ssafy.webgyver.db.repository.test.TestMemberRepository;
import com.ssafy.webgyver.db.repository.test.TestMemberRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class TestMemberImpl implements TestMemberService {
    @Autowired
    TestMemberRepository testMemberRepository;

    @Autowired
    TestMemberRepositorySupport testMemberRepositorySupport;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public TestMember createTestMember(UserRegisterPostReq userRegisterInfo) {
        return null;
    }

    @Override
    public TestMember getUserByUserId(String userId) {
        return null;
    }

}
