package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.article.ArticleIdxReq;
import com.ssafy.webgyver.api.request.article.ArticleAllReq;
import com.ssafy.webgyver.api.request.seller.SellerDescriptionUpdateReq;
import com.ssafy.webgyver.api.request.seller.SellerIdxReq;
import com.ssafy.webgyver.api.response.seller.SellerMyPageIntroRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;

import java.util.List;

public interface SellerMypageService {
    List<Article> getAllHistory(SellerIdxReq req);
    Article insertHistory(ArticleAllReq req);
    Article updateHistory(ArticleAllReq req);

    void deleteHistory(ArticleIdxReq req);
    SellerMyPageIntroRes getSellerMyPageIntro(SellerIdxReq req);
    BaseResponseBody updateSellerDescription(SellerIdxReq req, SellerDescriptionUpdateReq description);
}
