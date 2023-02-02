package com.ssafy.webgyver.api.request.common.picture;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PictureReq {
    private String saveName;
    private String originName;
}
