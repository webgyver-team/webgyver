package com.ssafy.webgyver.api.request.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureListReq;
import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRegisterReviewReq {
    Long reservationIdx;
    String title;
    String content;
    Integer rating;
    List<PictureReq> images;
}
