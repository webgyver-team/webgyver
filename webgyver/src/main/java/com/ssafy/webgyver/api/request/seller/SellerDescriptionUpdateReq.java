package com.ssafy.webgyver.api.request.seller;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerDescriptionUpdateReq {
    private String description;
}
