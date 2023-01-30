package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Article.ArticleIdxReq;
import com.ssafy.webgyver.api.request.Article.ArticleAllReq;
import com.ssafy.webgyver.api.request.Seller.SellerIdxReq;
import com.ssafy.webgyver.db.entity.Article;

import java.util.List;

public interface SellerMypageService {
    List<Article> getAllHistory(SellerIdxReq req);
    Article insertHistory(ArticleAllReq req);
    Article updateHistory(ArticleAllReq req);

    void deleteHistory(ArticleIdxReq req);
}
