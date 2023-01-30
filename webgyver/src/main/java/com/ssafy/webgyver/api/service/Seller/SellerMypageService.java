package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerMypageHistoryPostReq;
import com.ssafy.webgyver.api.request.Seller.SellerMypageHistoryPutReq;
import com.ssafy.webgyver.api.request.Seller.SellerMypageHistoryReq;
import com.ssafy.webgyver.api.response.Seller.SellerMypageHistoryRes;
import com.ssafy.webgyver.db.entity.Article;

import java.util.List;

public interface SellerMypageService {
    List<Article> getAllHistory(SellerMypageHistoryReq req);
    Article insertHistory(SellerMypageHistoryPostReq req);
    Article updateHistory(SellerMypageHistoryPutReq req);
}
