package com.ssafy.webgyver.api.response.article;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class HistoryListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class History {
        private Long articleIdx;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String title;
        private String content;
        private Long sellerIdx;

        public History(Article article) {
            this.articleIdx = article.getIdx();
            this.createdAt = article.getCreatedAt();
            this.updatedAt = article.getUpdatedAt();
            this.title = article.getTitle();
            this.content = article.getContent();
            this.sellerIdx = article.getType();
        }
    }

    public static HistoryListRes of(Integer statusCode, String message, List<Article> articleList) {
        HistoryListRes res = new HistoryListRes();
        List<History> historyList = new ArrayList<>();
        for (Article article :
                articleList) {
            historyList.add(new History(article));
        }
        res.getData().put("historyList", historyList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

}
