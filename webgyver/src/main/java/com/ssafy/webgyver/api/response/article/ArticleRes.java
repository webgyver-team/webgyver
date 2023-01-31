package com.ssafy.webgyver.api.response.article;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class ArticleRes extends DataResponseBody {
    public static ArticleRes of(Integer statusCode, String message, Article article) {
        ArticleRes res = new ArticleRes();
        res.getData().put("article", article);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
