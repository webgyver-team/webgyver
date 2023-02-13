package com.ssafy.webgyver.api.controller.customer;

import com.ssafy.webgyver.api.request.customer.CustomerModifyReviewReq;
import com.ssafy.webgyver.api.request.customer.CustomerMypageReq;
import com.ssafy.webgyver.api.request.customer.CustomerRegisterReviewReq;
import com.ssafy.webgyver.api.response.article.CustomerReviewListRes;
import com.ssafy.webgyver.api.response.customer.CustomerMypageRes;
import com.ssafy.webgyver.api.service.customer.CustomerMypageService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
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
            return ResponseEntity.ok().body(BaseResponseBody.of(500, "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
        }
    }

    @PutMapping("/profile/{idx}")
    public ResponseEntity<?> setProfile(@RequestBody CustomerMypageReq req) {
        BaseResponseBody result = customerMypageService.setProfile(req);

        if(result.getStatusCode() != 200)
            return ResponseEntity.ok().body(result);

        Customer customer = customerMypageService.getProfile(req.getIdx());

        if(customer != null) {
            return ResponseEntity.ok().body(CustomerMypageRes.of(200, "OK", customer));

        } else {
            return ResponseEntity.ok().body(BaseResponseBody.of(500, "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
        }
    }

    @GetMapping("/review/{idx}")
    public ResponseEntity<?> getReviewList(@PathVariable Long idx, CustomerMypageReq req) {
        List<Map<String, Object>> articles = customerMypageService.getReviewList(req);

        if (articles != null) {
            return ResponseEntity.ok().body(CustomerReviewListRes.getCustomerArticleList(200, "OK", articles));

        } else {
            return ResponseEntity.ok().body(BaseResponseBody.of(500, "목록을 가져올 수 없습니다. 잠시 후 다시 시도해 주세요."));
        }
    }

    @PostMapping("/review")
    public ResponseEntity<?> registerReview(@RequestBody CustomerRegisterReviewReq req) {
        BaseResponseBody result = customerMypageService.regiterReview(req);

        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/review/{a_idx}")
    public ResponseEntity<?> modifyReview(@PathVariable(name = "a_idx") Long reviewIdx, @RequestBody CustomerModifyReviewReq req) {
        BaseResponseBody result = customerMypageService.modifyReview(req);

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/review/{a_idx}")
    public ResponseEntity<?> deleteReview(@PathVariable(name = "a_idx") Long reviewIdx) {
        BaseResponseBody result = customerMypageService.deleteReview(reviewIdx);

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/review/detail/{r_idx}")
    public ResponseEntity<?> getDetailReview(@PathVariable(name = "r_idx") Long reviewIdx) {
        return ResponseEntity.ok().body(customerMypageService.getDetailReview(reviewIdx));
    }
}
