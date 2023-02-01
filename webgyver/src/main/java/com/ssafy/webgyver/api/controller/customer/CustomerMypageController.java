package com.ssafy.webgyver.api.controller.customer;

import com.ssafy.webgyver.api.request.customer.CustomerMypageReq;
import com.ssafy.webgyver.api.response.article.HistoryListRes;
import com.ssafy.webgyver.api.response.customer.CustomerMypageRes;
import com.ssafy.webgyver.api.service.customer.CustomerMypageService;
import com.ssafy.webgyver.db.entity.Customer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/customer/mypage")
public class CustomerMypageController {
    final CustomerMypageService customerMypageService;

    @GetMapping("/profile/{idx}")
    public ResponseEntity<?> getProfile(@PathVariable("idx") Long idx, CustomerMypageReq req) {
        Customer customer = customerMypageService.getProfile(req.getIdx());

        if(customer != null) {
            return ResponseEntity.ok().body(CustomerMypageRes.of(200, "OK", customer));

        } else {
            return ResponseEntity.ok().body(CustomerMypageRes.of(500, "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
        }
    }

    @PutMapping("/profile/{idx}")
    public ResponseEntity<?> setProfile(@RequestBody CustomerMypageReq req) {
        Customer customer = customerMypageService.setProfile(req);

        if(customer != null) {
            return ResponseEntity.ok().body(CustomerMypageRes.of(200, "OK", customer));

        } else {
            return ResponseEntity.ok().body(CustomerMypageRes.of(500, "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
        }
    }

    @GetMapping("/review/{idx}")
    public ResponseEntity<?> getReviewList(@PathVariable Long idx, CustomerMypageReq req) {
        List<Map<String, Object>> articles = customerMypageService.getReviewList(req);

//        if (articles != null && !articles.isEmpty()) {
//            return ResponseEntity.ok().body(HistoryListRes.getCustomerArticleList(200, "OK", articles));
//
//        } else {
//            return ResponseEntity.ok().body(CustomerMypageRes.of(500, "목록을 가져올 수 없습니다. 잠시 후 다시 시도해 주세요."));
//        }
        return null;
    }
}
