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
        String time;
    }
    private List<CompanyTime> companyTime = new ArrayList<>();
}
