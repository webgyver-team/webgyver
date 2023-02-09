package com.ssafy.webgyver.api.request.seller;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerUpdateBookTimeReq {
    @ToString
    @Getter
    public static class BookTime{
        String day;
        String open;
        String close;
        Boolean holiday;
    }
    public List<BookTime> bookTimeList = new ArrayList<>();
}
