package com.ssafy.webgyver.api.controller.seller;

import com.ssafy.webgyver.api.request.article.ArticleAllReq;
import com.ssafy.webgyver.api.request.article.ArticleIdxReq;
import com.ssafy.webgyver.api.response.article.HistoryListRes;
import com.ssafy.webgyver.api.service.Seller.SellerMypageService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.webgyver.api.request.seller.SellerIdxReq;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/seller/mypage")
public class SellerMypageController {

    final SellerMypageService sellerMypageService;

    @GetMapping("/history/{sellerIdx}")
    public ResponseEntity<HistoryListRes> getAllHistory(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq req) {
        log.info("{}", req);
        List<Article> articleList = sellerMypageService.getAllHistory(req);
        for (Article article :
                articleList) {
        }
        return ResponseEntity.ok(
                HistoryListRes.of(200, "Success", articleList)
        );
    }

    @PostMapping("/history")
    public ResponseEntity<BaseResponseBody> insertHistory(@RequestBody ArticleAllReq req) {
        Article result = sellerMypageService.insertHistory(req);
        if (result != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @PutMapping("/history/{articleIdx}")
    public ResponseEntity<BaseResponseBody> updateHistory(@PathVariable Long articleIdx, @RequestBody ArticleAllReq req) {
        log.info("updateHistory : {}", req);
        Article result = sellerMypageService.updateHistory(req);

        if (result != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @DeleteMapping("/history/{articleIdx}")
    public ResponseEntity<BaseResponseBody> deleteHistory(@PathVariable("articleIdx") Long articleIdx, ArticleIdxReq req) {
        log.info("{}", req);
        try {
            sellerMypageService.deleteHistory(req);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }
}
