package com.ssafy.webgyver.api.controller.customer;

import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerSignUpPostRes;
import com.ssafy.webgyver.api.service.customer.CustomerMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/customer/member")
public class CustomerMemberController {
    final CustomerMemberService customerMemberService;

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<CustomerSignUpPostRes> signUp(@RequestBody CustomerSignUpPostReq signUpInfo) {
        log.debug("hi");
        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        CustomerSignUpPostRes result = customerMemberService.SignUpCustomer(signUpInfo);
        return ResponseEntity.ok().body(result);
    }

}
