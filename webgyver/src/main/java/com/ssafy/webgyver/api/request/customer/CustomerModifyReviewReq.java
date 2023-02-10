package com.ssafy.webgyver.api.request.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerModifyReviewReq {
    Long reviewIdx;
    String title;
    String content;
    Integer rating;
    List<PictureReq> images;
}
