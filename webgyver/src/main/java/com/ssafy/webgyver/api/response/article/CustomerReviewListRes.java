package com.ssafy.webgyver.api.response.article;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CustomerReviewListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Review {
        Long reviewIdx;
        Long reservationIdx;
        String title;
        String content;
        Long rating;
        List<ReviewImage> images;

        public Review(Article article, List<ReviewImage> images) {
            this.reviewIdx = article.getIdx();
            this.reservationIdx = article.getReservation().getIdx();
            this.title = article.getTitle();
            this.content = article.getContent();
            this.rating = Math.abs(article.getType()) - 2;
            this.images = images;
        }
    }

    @Getter
    @NoArgsConstructor
    static class DetailReview {
        Long reviewIdx;
        String title;
        String content;
        Long rating;
        List<ReviewImage> images;

        public DetailReview(Article article, List<ReviewImage> images) {
            this.reviewIdx = article.getIdx();
            this.title = article.getTitle();
            this.content = article.getContent();
            this.rating = Math.abs(article.getType()) - 2;
            this.images = images;
        }
    }

    @Getter
    @NoArgsConstructor
    static class ReviewImage {
        String originName;
        String saveName;

        public ReviewImage(Picture picture) {
            this.originName = picture.getOriginName();
            this.saveName = picture.getSaveName();
        }
    }

    public static CustomerReviewListRes getCustomerArticleList(Integer statusCode, String message, List<Map<String, Object>> reviewList) {
        CustomerReviewListRes res = new CustomerReviewListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        List<Review> reviews = new ArrayList<>();

        for (Map<String, Object> review : reviewList) {
            Article article = (Article) review.get("review");
            List<Picture> pictures = (List<Picture>) review.get("images");

            reviews.add(new Review(article, pictures.stream().map(ReviewImage::new).collect(Collectors.toList())));
        }

        res.getData().put("reviews", reviews);

        return res;
    }

    public static CustomerReviewListRes getDetailCustomerArticle(Integer statusCode, String message, Map<String, Object> review) {
        CustomerReviewListRes res = new CustomerReviewListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        Article article = (Article) review.get("review");
        List<Picture> pictures = (List<Picture>) review.get("images");

        DetailReview detailReview = new DetailReview(article, pictures.stream().map(ReviewImage::new).collect(Collectors.toList()));

        res.getData().put("review", detailReview);

        return res;
    }
}
