package com.ssafy.webgyver.api.controller.test;

import com.ssafy.webgyver.api.request.test.MemberLoginPostReq;
import com.ssafy.webgyver.api.request.test.MemberSignUpPostReq;
import com.ssafy.webgyver.api.response.test.MemberLoginPostRes;
import com.ssafy.webgyver.api.response.test.MemberSignUpPostRes;
import com.ssafy.webgyver.api.service.test.TestMemberService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.common.util.JwtTokenUtil;
import com.ssafy.webgyver.db.entity.User;
import com.ssafy.webgyver.db.entity.test.TestMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class TestController {

    final TestMemberService testMemberService;
    final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<MemberLoginPostRes> login(@RequestBody MemberLoginPostReq loginInfo) {
        Long userId = loginInfo.getId();
        String password = loginInfo.getPassword();

        TestMember member = testMemberService.getTestMemberByMemberId(userId);
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, member.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(
                    MemberLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(
                            String.valueOf(userId)),member));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401)
                .body(MemberLoginPostRes.of(401, "Invalid Password", null,member));
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberSignUpPostRes> signUp(@RequestBody MemberSignUpPostReq signUpInfo) {
        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        System.out.println(signUpInfo.toString());
        testMemberService.createTestMember(signUpInfo);

        return ResponseEntity.status(200).body(MemberSignUpPostRes.of(200, "Success"));
    }


}
