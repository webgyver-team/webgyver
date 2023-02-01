package com.ssafy.webgyver.api.controller.seller;

import com.ssafy.webgyver.api.request.seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.seller.SellerCheckDuplicateRes;
import com.ssafy.webgyver.api.response.seller.SellerLoginRes;
import com.ssafy.webgyver.api.response.seller.SellerSignUpPostRes;
import com.ssafy.webgyver.api.service.Seller.SellerService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
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
    public ResponseEntity<?> signUp(@RequestBody SellerSignUpPostReq signUpInfo) {
        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        sellerService.SignUpSeller(signUpInfo);
        return ResponseEntity.ok().body(BaseResponseBody.of(200, "Success"));
    }

    // 중복 체크
    @GetMapping("/check/duplicate")
    public ResponseEntity<?> checkDuplicate(@RequestBody SellerCheckDuplicateReq req){
        boolean check = sellerService.checkDuplicate(req);
        if (check) {
            return ResponseEntity.ok().body(BaseResponseBody.of(200, "중복된 아이디"));
        } else {
            return ResponseEntity.ok().body(BaseResponseBody.of(200, "사용 가능한 아이디"));
        }
    }

    // 로그인
    @PostMapping("/member/login")
    public ResponseEntity<?> login(@RequestBody SellerLoginReq req) {
        SellerLoginRes result = sellerService.login(req);
        return ResponseEntity.ok().body(result);
    }
}
