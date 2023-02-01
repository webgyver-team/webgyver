package com.ssafy.webgyver.api.response.article;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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

    public static ArticleListRes getCustomerArticleList(Integer statusCode, String message, List<Map<String, Object>> reviewList) {
        ArticleListRes res = new ArticleListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        List<Object> reviews = new ArrayList<>();

        for (Map<String, Object> review : reviewList) {
            Map<String, Object> map = new HashMap<>();

            Article article = (Article) review.get("review");
            map.put("reviewIdx", article.getIdx());
            map.put("reservationIdx", article.getReservation().getIdx());
            map.put("title", article.getTitle());
            map.put("content", article.getContent());
            map.put("rating", Math.abs(article.getType()) - 2);

            List<Picture> pictures = (List<Picture>) review.get("images");
            map.put("image", pictures);

            reviews.add(map);
        }

        res.getData().put("reviews", reviews);

        return res;
    }
}
