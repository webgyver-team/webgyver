package com.ssafy.webgyver.api.response.article;

import com.ssafy.webgyver.api.response.common.picture.PictureListRes;
import com.ssafy.webgyver.api.response.common.picture.PictureRes;
import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class HistoryListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    @Setter
    static class History {
        private Long articleIdx;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        //        private String title;
        private String content;
        private Long sellerIdx;
        private List<PictureRes> images;

        public History(Article article) {
            this.articleIdx = article.getIdx();
            this.createdAt = article.getCreatedAt();
            this.updatedAt = article.getUpdatedAt();
//            this.title = article.getTitle();
            this.content = article.getContent();
            this.sellerIdx = article.getType();
//            this.images =
        }
    }

    public static HistoryListRes of(Integer statusCode, String message, List<Article> articleList, Map<Long, List<Picture>> pictureMap) {
        HistoryListRes res = new HistoryListRes();

        List<History> historyList = articleList.stream().map(History::new).collect(Collectors.toList());
        for (History history : historyList) {
            List<PictureRes> temp = new ArrayList<>();
            for (Picture picture : pictureMap.get(history.getArticleIdx())) {
                PictureRes temp2 = new PictureRes();
                temp2.setOriginName(picture.getOriginName());
                temp2.setSaveName(picture.getSaveName());
                temp.add(temp2);
            }
            history.setImages(temp);
        }
        res.getData().put("historyList", historyList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

}
