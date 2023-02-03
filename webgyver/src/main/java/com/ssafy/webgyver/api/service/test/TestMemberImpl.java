package com.ssafy.webgyver.api.service.test;

import com.ssafy.webgyver.api.request.UserRegisterPostReq;
import com.ssafy.webgyver.api.request.test.MemberLoginPostReq;
import com.ssafy.webgyver.api.request.test.MemberSignUpPostReq;
import com.ssafy.webgyver.db.entity.User;
import com.ssafy.webgyver.db.entity.test.TestMember;
import com.ssafy.webgyver.db.repository.test.TestMemberRepository;
import com.ssafy.webgyver.db.repository.test.TestMemberRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestMemberImpl implements TestMemberService {
    final TestMemberRepository testMemberRepository;

    final TestMemberRepositorySupport testMemberRepositorySupport;

    final PasswordEncoder passwordEncoder;

    @Override
    public TestMember createTestMember(MemberSignUpPostReq memberSignUpInfo) {
        TestMember member = new TestMember();
        member.setUsername(memberSignUpInfo.getName());
        member.setAge(memberSignUpInfo.getAge());
        member.setRoleType(memberSignUpInfo.getRoleType());
        member.setDescription(memberSignUpInfo.getDescription());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        member.setPassword(passwordEncoder.encode(memberSignUpInfo.getPassword()));
        testMemberRepository.save(member);
        return member;
    }

    @Override
    public TestMember getTestMemberByMemberId(Long userId) {
        TestMember testMember = testMemberRepository.findById(userId).get();
        
        return testMember;
    }

    @Override
    public TestMember loginTestMember(MemberLoginPostReq memberLoginInfo) {
        TestMember member = testMemberRepository.findByIdAndPassword(memberLoginInfo.getId(), memberLoginInfo.getPassword());
        return null;
    }

}
