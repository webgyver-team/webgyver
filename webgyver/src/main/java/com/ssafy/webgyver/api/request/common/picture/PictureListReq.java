package com.ssafy.webgyver.api.request.common.picture;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PictureListReq {
    private List<PictureReq> images;
}
