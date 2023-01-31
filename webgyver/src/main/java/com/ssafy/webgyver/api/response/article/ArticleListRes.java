package com.ssafy.webgyver.api.response.article;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
public class ArticleListRes extends DataResponseBody {
    public static ArticleListRes ofHistory(Integer statusCode, String message, List<Article> articleList) {
        ArticleListRes res = new ArticleListRes();
        res.getData().put("articleList", getHistoryFromList(articleList));
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

    public static ArticleListRes of(Integer statusCode, String message, List<Article> articleList) {
        ArticleListRes res = new ArticleListRes();
        res.getData().put("articleList", articleList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

    public static List<Map<String, Object>> getHistoryFromList(List<Article> articleList) {
        List<Map<String, Object>> historyList = new ArrayList<>();
        for (Article article : articleList) {
            Map<String, Object> history = new HashMap<>();
            history.put("articlIdx", article.getIdx());
            history.put("createdAt", article.getCreatedAt());
            history.put("updatedAt", article.getUpdatedAt());
            history.put("title", article.getTitle());
            history.put("content", article.getContent());
            history.put("sellerIdx", article.getType());
            historyList.add(history);
        }
        return historyList;
    }
}
