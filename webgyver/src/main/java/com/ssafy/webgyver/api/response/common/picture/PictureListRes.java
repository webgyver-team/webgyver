package com.ssafy.webgyver.api.response.common.picture;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PictureListRes {
    private List<PictureRes> images;
}
