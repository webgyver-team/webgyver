package com.ssafy.webgyver.api.request.seller;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerTimeUpdateReq {
    @ToString
    @Getter
    public static class CompanyTime{
        String day;
        String open;
        String close;
        Boolean holiday;
    }
    private List<CompanyTime> companyTime = new ArrayList<>();
}
