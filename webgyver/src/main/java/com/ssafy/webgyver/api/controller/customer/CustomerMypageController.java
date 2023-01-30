package com.ssafy.webgyver.api.controller.customer;

import com.ssafy.webgyver.api.request.customer.CustomerMypageProfileReq;
import com.ssafy.webgyver.api.response.customer.CustomerMypageProfileRes;
import com.ssafy.webgyver.api.service.customer.CustomerMypageService;
import com.ssafy.webgyver.db.entity.Customer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/customer/mypage")
public class CustomerMypageController {
    final CustomerMypageService customerMypageService;

    @GetMapping("/profile/{idx}")
    public ResponseEntity<?> getProfile(@PathVariable("idx") Long idx, CustomerMypageProfileReq req) {
        Customer customer = customerMypageService.getProfile(req.getIdx());

        if(customer != null) {
            return ResponseEntity.ok().body(CustomerMypageProfileRes.of(200, "OK", customer));

        } else {
            return ResponseEntity.ok().body(CustomerMypageProfileRes.of(500, "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
        }
    }
}
