package com.ssafy.webgyver.api.request.seller;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerCalendarReq {

    private Long sellerIdx;
    private LocalDateTime day;
}
