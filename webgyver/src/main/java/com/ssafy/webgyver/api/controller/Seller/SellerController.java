package com.ssafy.webgyver.api.controller.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.Seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.Seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.Seller.SellerCheckDuplicateRes;
import com.ssafy.webgyver.api.response.Seller.SellerLoginRes;
import com.ssafy.webgyver.api.response.Seller.SellerSignUpPostRes;
import com.ssafy.webgyver.api.service.Seller.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/seller")
public class SellerController {

    final SellerService sellerService;

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<SellerSignUpPostRes> signUp(@RequestBody SellerSignUpPostReq signUpInfo) {
        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        sellerService.SignUpSeller(signUpInfo);
        return ResponseEntity.ok().body(SellerSignUpPostRes.of(200, "Success"));
    }

    // 중복 체크
    @GetMapping("/check/duplicate")
    public ResponseEntity<?> checkDuplicate(@RequestBody SellerCheckDuplicateReq req){
        boolean check = sellerService.checkDuplicate(req);
        if (check) {
            return ResponseEntity.ok().body(SellerCheckDuplicateRes.of(200, "중복된 아이디"));
        } else {
            return ResponseEntity.ok().body(SellerCheckDuplicateRes.of(200, "사용 가능한 아이디"));
        }
    }

    // 로그인
    @PostMapping("/member/login")
    public ResponseEntity<?> login(@RequestBody SellerLoginReq req) {
        SellerLoginRes result = sellerService.login(req);
        return ResponseEntity.ok().body(result);
    }
}
