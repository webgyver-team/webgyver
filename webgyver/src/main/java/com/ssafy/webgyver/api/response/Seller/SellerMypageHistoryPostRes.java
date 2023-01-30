package com.ssafy.webgyver.api.response.Seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class SellerMypageHistoryPostRes extends DataResponseBody {
    public static SellerMypageHistoryPostRes of(Integer statusCode, String message, Article article) {
        SellerMypageHistoryPostRes res = new SellerMypageHistoryPostRes();
        res.getData().put("article", article);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}