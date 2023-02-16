package com.ssafy.webgyver.api.controller.seller;

import com.ssafy.webgyver.api.request.seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.seller.SellerLoginRes;
import com.ssafy.webgyver.api.service.seller.SellerService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/seller/member")
public class SellerController {

    final SellerService sellerService;

    // 회원 가입
    @PostMapping("/join")
    public ResponseEntity<?> signUp(@RequestBody SellerSignUpPostReq signUpInfo) {
        BaseResponseBody res = sellerService.SignUpSeller(signUpInfo);
        return ResponseEntity.ok().body(res);
    }

    // 중복 체크
    @PostMapping("/check/duplicate")
    public ResponseEntity<?> checkDuplicate(@RequestBody SellerCheckDuplicateReq req){
        BaseResponseBody res = sellerService.checkDuplicate(req);
        return ResponseEntity.ok().body(res);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SellerLoginReq req) {
        SellerLoginRes result = sellerService.login(req);
        return ResponseEntity.ok().body(result);
    }
}
