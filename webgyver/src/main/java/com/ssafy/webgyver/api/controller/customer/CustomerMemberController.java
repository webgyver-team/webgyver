package com.ssafy.webgyver.api.controller.customer;

import com.ssafy.webgyver.api.request.customer.CustomerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.customer.CustomerLoginReq;
import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerLoginRes;
import com.ssafy.webgyver.api.service.customer.CustomerMemberService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
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
    @PostMapping("/join")
    public ResponseEntity<?> signUp(@RequestBody CustomerSignUpPostReq signUpInfo) {
        BaseResponseBody result = customerMemberService.SignUpCustomer(signUpInfo);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CustomerLoginReq req) {
        CustomerLoginRes result = customerMemberService.login(req);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/check/duplicate")
    public ResponseEntity<?> check(@RequestBody CustomerCheckDuplicateReq req){
        BaseResponseBody result = customerMemberService.checkDuplicate(req);
        return ResponseEntity.ok().body(result);
    }
}
