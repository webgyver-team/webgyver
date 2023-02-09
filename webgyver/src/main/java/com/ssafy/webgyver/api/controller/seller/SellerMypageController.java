package com.ssafy.webgyver.api.controller.seller;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.ssafy.webgyver.api.request.article.ArticleAllReq;
import com.ssafy.webgyver.api.request.article.ArticleIdxReq;
import com.ssafy.webgyver.api.request.common.picture.PictureListReq;
import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.request.seller.*;
import com.ssafy.webgyver.api.response.article.HistoryListRes;
import com.ssafy.webgyver.api.response.seller.SellerMyPageIntroRes;
import com.ssafy.webgyver.api.response.seller.SellerMypageReviewListRes;
import com.ssafy.webgyver.api.service.Seller.SellerMypageService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
        Map<Long, List<Picture>> pictureMap = sellerMypageService.getAllPictureMap(articleList);
        return ResponseEntity.ok(
                HistoryListRes.of(200, "Success", articleList, pictureMap)
        );
    }

    @PostMapping("/history")
    public ResponseEntity<BaseResponseBody> insertHistory(
            @RequestBody Map<String, Object> request
//            @RequestBody ArticleAllReq articleAllReq, @RequestBody PictureListReq pictureListReq
    ) {
        ArticleAllReq articleAllReq = new ArticleAllReq();
        articleAllReq.setType(new Long((int) request.get("type")));
        articleAllReq.setContent((String) request.get("content"));

        PictureListReq pictureListReq = new PictureListReq();
        Gson gson = new Gson();
        pictureListReq.setImages(gson.fromJson(gson.toJson(request.get("images")), new TypeToken<List<PictureReq>>() {
        }.getType()));


        Article result = sellerMypageService.insertHistory(articleAllReq);
        sellerMypageService.insertPictures(result, pictureListReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/history/{articleIdx}")
    public ResponseEntity<BaseResponseBody> updateHistory(
            @PathVariable Long articleIdx,
            @RequestBody Map<String, Object> request
//            @RequestBody ArticleAllReq articleAllReq, @RequestBody PictureListReq pictureListReq
    ) {
        // 1. 아티클과 연관단 사진 모두 삭제
        sellerMypageService.deleteAllPicture(articleIdx);
        // 2. 아티클 업데이트
        // 3. 사진 일괄등록

        ArticleAllReq articleAllReq = new ArticleAllReq();
        articleAllReq.setType(Long.valueOf(String.valueOf(request.get("type"))));
        articleAllReq.setContent((String) request.get("content"));

        PictureListReq pictureListReq = new PictureListReq();
        Gson gson = new Gson();
        pictureListReq.setImages(gson.fromJson(gson.toJson(request.get("images")), new TypeToken<List<PictureReq>>() {
        }.getType()));


        Article result = sellerMypageService.insertHistory(articleAllReq);
        sellerMypageService.insertPictures(result, pictureListReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/history/{articleIdx}")
    public ResponseEntity<BaseResponseBody> deleteHistory(@PathVariable("articleIdx") long articleIdx) {
        ArticleIdxReq req = new ArticleIdxReq();
        req.setArticleIdx(articleIdx);
        log.info("!!!!!!!!!!!!!!!!!!!!!{}", req);
        sellerMypageService.deleteHistory(req);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/intro/{sellerIdx}")
    public ResponseEntity<?> getPartnerIntro(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq req) {
        log.info("intro Controller 들어옴 , {}", sellerIdx);
        SellerMyPageIntroRes result = sellerMypageService.getSellerMyPageIntro(req);

        return ResponseEntity.status(200).body(result);
    }

    @PutMapping("intro/description/{sellerIdx}")
    public ResponseEntity<?> updatePartnerDescription(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq req, @RequestBody SellerDescriptionUpdateReq descriptionReq) {
        BaseResponseBody res = sellerMypageService.updateSellerDescription(req, descriptionReq);
        return ResponseEntity.status(200).body(res);
    }

    @PutMapping("/intro/time/{sellerIdx}")
    public ResponseEntity<?> updatePartnerTime(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq req, @RequestBody SellerTimeUpdateReq timeReq) {
        BaseResponseBody res = sellerMypageService.updateSellerTime(req, timeReq);
        return ResponseEntity.ok().body(res);
    }

    @PutMapping("/profile/{sellerIdx}")
    public ResponseEntity<?> updatePartnerProfile(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq req, @RequestBody SellerProfileUpdateReq profileReq) {
        BaseResponseBody res = sellerMypageService.updateSellerProfile(req, profileReq);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/review/{sellerIdx}")
    public ResponseEntity<?> getReviewList(@PathVariable Long sellerIdx, SellerIdxReq req) {
        return ResponseEntity.ok().body(sellerMypageService.getReviewList(req));
    }

    @PostMapping("/comment")
    public ResponseEntity<?> registerComment(@RequestBody SellerCommentRegisterReq req) {
        return ResponseEntity.ok().body(sellerMypageService.registerComment(req));
    }

    @PutMapping("/comment/{a_idx}")
    public ResponseEntity<?> modifyComment(@RequestBody SellerCommentModifyReq req) {
        return ResponseEntity.ok().body(sellerMypageService.modifyComment(req));
    }

    @DeleteMapping("/comment/{a_idx}")
    public ResponseEntity<?> deleteComment(@PathVariable(name = "a_idx") Long commentIdx) {
        return ResponseEntity.ok().body(sellerMypageService.deleteComment(commentIdx));
    }
}
