package com.ssafy.webgyver.api.controller.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerMypageHistoryDelReq;
import com.ssafy.webgyver.api.request.Seller.SellerMypageHistoryPostReq;
import com.ssafy.webgyver.api.request.Seller.SellerMypageHistoryPutReq;
import com.ssafy.webgyver.api.request.Seller.SellerMypageHistoryReq;
import com.ssafy.webgyver.api.response.Seller.SellerMypageHistoryPostRes;
import com.ssafy.webgyver.api.response.Seller.SellerMypageHistoryRes;
import com.ssafy.webgyver.api.service.Seller.SellerMypageService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/seller/mypage")
public class SellerMypageController {

    final SellerMypageService sellerMypageService;

    @GetMapping("/history/{sellerIdx}")
    public ResponseEntity<SellerMypageHistoryRes> getAllHistory(
            @PathVariable("sellerIdx")
            SellerMypageHistoryReq req
    ) {
        log.info("{}", req);
        List<Article> articleList = sellerMypageService.getAllHistory(req);
        for (Article article :
                articleList) {
            System.out.println(article);
        }
        return ResponseEntity.ok(
                SellerMypageHistoryRes.of(200, "Success", articleList)
        );
    }

    @PostMapping("/history")
    public ResponseEntity<BaseResponseBody> insertHistory(@RequestBody SellerMypageHistoryPostReq req) {
        Article result = sellerMypageService.insertHistory(req);
        if (result != null) {
            return ResponseEntity.status(200).body(SellerMypageHistoryPostRes.of(200, "Success", result));
        } else {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @PutMapping("/history/{articleIdx}")
    public ResponseEntity<BaseResponseBody> updateHistory(@PathVariable Long articleIdx, @RequestBody SellerMypageHistoryPutReq req) {
        log.info("updateHistory : {}", req);
        Article result = sellerMypageService.updateHistory(req);

        if (result != null) {
            return ResponseEntity.status(200).body(SellerMypageHistoryPostRes.of(200, "Success", result));
        } else {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @DeleteMapping("/history/{articleIdx}")
    public ResponseEntity<BaseResponseBody> deleteHistory(@PathVariable("articleIdx") Long articleIdx, SellerMypageHistoryDelReq req) {
        log.info("{}", req);
        try {
            sellerMypageService.deleteHistory(req);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }
}
