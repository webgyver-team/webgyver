package com.ssafy.webgyver.api.request.Seller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.entity.test.RoleType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Lob;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class SellerSignUpPostReq {
    private String id;
    private String password;
    private String name;

    private String birthDay;
    private String phoneNumber;
    private String companyName;
    private String representativeName;

    private String companyNumber;

    private String description;
    private RoleType roleType;
    private String address;
    private String detailAddress;
    private List<SellerCategory> categoryList;
}
