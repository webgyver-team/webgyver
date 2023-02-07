package com.ssafy.webgyver.api.request.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureListReq;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRegisterReviewReq {
    Long reservationIdx;
    String title;
    String content;
    Integer star;
    PictureListReq pictureListReq;
}
