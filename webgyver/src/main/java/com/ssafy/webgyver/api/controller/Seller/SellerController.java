package com.ssafy.webgyver.api.controller.Seller;

import com.ssafy.webgyver.api.request.test.MemberSignUpPostReq;
import com.ssafy.webgyver.api.response.test.MemberSignUpPostRes;
import com.ssafy.webgyver.api.service.Seller.SellerService;
import com.ssafy.webgyver.db.entity.Seller;
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
    @PostMapping("/signup")
    public ResponseEntity<MemberSignUpPostRes> signUp(@RequestBody MemberSignUpPostReq signUpInfo) {
        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        System.out.println(signUpInfo.toString());
        sellerService.createTestMember(signUpInfo);

        return ResponseEntity.status(200).body(MemberSignUpPostRes.of(200, "Success"));
    }

}
