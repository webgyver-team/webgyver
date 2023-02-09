package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.article.ArticleIdxReq;
import com.ssafy.webgyver.api.request.article.ArticleAllReq;
import com.ssafy.webgyver.api.request.common.picture.PictureListReq;
import com.ssafy.webgyver.api.request.seller.*;
import com.ssafy.webgyver.api.response.common.picture.PictureListRes;
import com.ssafy.webgyver.api.response.seller.SellerGetBookTimeRes;
import com.ssafy.webgyver.api.response.seller.SellerMyPageIntroRes;
import com.ssafy.webgyver.api.response.seller.SellerMypageReviewListRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;

import java.util.List;
import java.util.Map;

public interface SellerMypageService {
    List<Article> getAllHistory(SellerIdxReq req);

    Article insertHistory(ArticleAllReq req);

    Article updateHistory(ArticleAllReq req);

    Map<Long, List<Picture>> getAllPictureMap(List<Article> articleList);

    void deleteAllPicture(long articleIdx);

    void insertPictures(Article article, PictureListReq req);

    void updatePictures(Article article, PictureListReq req);

    void deleteHistory(ArticleIdxReq req);

    SellerMyPageIntroRes getSellerMyPageIntro(SellerIdxReq req);

    BaseResponseBody updateSellerDescription(SellerIdxReq req, SellerDescriptionUpdateReq description);

    BaseResponseBody updateSellerTime(SellerIdxReq req, SellerTimeUpdateReq timeReq);

    BaseResponseBody updateSellerProfile(SellerIdxReq req, SellerProfileUpdateReq timeReq);

    SellerMypageReviewListRes getReviewList(SellerIdxReq req);

    BaseResponseBody registerComment(SellerCommentRegisterReq req);

    BaseResponseBody modifyComment(SellerCommentModifyReq req);

    BaseResponseBody deleteComment(Long commentIdx);
    SellerGetBookTimeRes getSellerBookTime(SellerIdxReq req);
    BaseResponseBody updateSellerBookTime(SellerIdxReq req, SellerUpdateBookTimeReq timeReq);
}
