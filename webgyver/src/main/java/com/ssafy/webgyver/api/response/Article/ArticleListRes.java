package com.ssafy.webgyver.api.response.Article;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
public class ArticleListRes extends DataResponseBody {
    public static ArticleListRes of(Integer statusCode, String message, List<Article> articleList) {
        ArticleListRes res = new ArticleListRes();
        res.getData().put("articleList", articleList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
