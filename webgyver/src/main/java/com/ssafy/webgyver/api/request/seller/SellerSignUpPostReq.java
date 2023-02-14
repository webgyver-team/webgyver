package com.ssafy.webgyver.api.request.seller;

import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.entity.RoleType;
import java.util.ArrayList;
import java.util.List;
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
public class SellerSignUpPostReq {
    private String id;
    private String password;
    private String name;

    private String birthDay;
    private String phoneNumber;
    private String companyName;
    private String representativeName;

    private String companyNumber;

    private RoleType roleType;
    private String address;
    private String detailAddress;
    private Double lng;
    private Double lat;
    private List<SellerCategory> categoryList = new ArrayList<>();
}
