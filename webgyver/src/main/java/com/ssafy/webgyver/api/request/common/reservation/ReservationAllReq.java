package com.ssafy.webgyver.api.request.common.reservation;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationAllReq {

    private Long customerIdx;
    private Long sellerIdx;
    private Long categoryIdx;
    private String time;
    private String address;
    private String detailAddress;
    private String title;
    private String content;
    private List<PictureReq> images;
    private Double lat;
    private Double lng;

}
