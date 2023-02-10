package com.ssafy.webgyver.api.response.seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.Picture;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.C;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
public class SellerMypageReviewListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Review {
        Long reviewIdx;
        Long reservationIdx;
        Long customerIdx;
        String customerName;
        String title;
        String content;
        Long rating;
        Comment comment;
        List<ReviewImage> images;

        public Review(Article article, Customer customer, Article comment, List<ReviewImage> images) {
            this.reviewIdx = article.getIdx();
            this.reservationIdx = article.getReservation().getIdx();
            this.customerIdx = customer.getIdx();
            this.customerName = customer.getName();
            this.title = article.getTitle();
            this.content = article.getContent();
            this.rating = Math.abs(article.getType()) - 2;
            this.comment = comment != null ? new Comment(comment.getIdx(), comment.getContent()) : null;
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

    @Getter
    @AllArgsConstructor
    static class Comment {
        Long commentIdx;
        String commentContent;
    }

    public static SellerMypageReviewListRes of(Integer statusCode, String message, List<Map<String, Object>> reviewList) {
        SellerMypageReviewListRes res = new SellerMypageReviewListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        List<Review> reviews = new ArrayList<>();

        for (Map<String, Object> review : reviewList) {
            Article article = (Article) review.get("review");
            Customer customer = (Customer) review.get("customer");
            Article comment = (Article) review.get("comment");
            List<Picture> pictures = (List<Picture>) review.get("images");

            reviews.add(new Review(article, customer, comment, pictures.stream().map(ReviewImage::new).collect(Collectors.toList())));
        }

        res.getData().put("reviews", reviews);

        return res;
    }
}
