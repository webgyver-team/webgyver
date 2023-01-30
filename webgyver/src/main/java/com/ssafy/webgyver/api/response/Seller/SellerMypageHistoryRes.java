package com.ssafy.webgyver.api.response.Seller;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
public class SellerMypageHistoryRes extends DataResponseBody {
    public static SellerMypageHistoryRes of(Integer statusCode, String message, List<Article> articleList) {
        SellerMypageHistoryRes res = new SellerMypageHistoryRes();
        res.getData().put("articleList", articleList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
