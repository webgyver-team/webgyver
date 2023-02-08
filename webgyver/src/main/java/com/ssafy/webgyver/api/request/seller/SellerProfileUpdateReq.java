package com.ssafy.webgyver.api.request.seller;

import com.ssafy.webgyver.db.entity.SellerCategory;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SellerProfileUpdateReq {
    private String profileImage;
    private String backgroundImage;
    private String password;
    private String phoneNumber;
    private String companyName;
    private String partnerName;
    private String companyNumber;
    private String address;
    private String detailAddress;
    private List<SellerCategory> categoryList = new ArrayList<>();

}
