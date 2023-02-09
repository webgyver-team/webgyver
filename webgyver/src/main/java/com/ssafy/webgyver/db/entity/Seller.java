package com.ssafy.webgyver.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "seller")
@DynamicInsert
@ToString
public class Seller extends BaseEntity {

    @Column(unique = true, length = 50)
    private String id;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    @Column(name = "representative_name")
    String representativeName;


    @Column(name = "birth_day")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime birthDay;

    private String gender;

    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "company_number")
    private String companyNumber;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_time")
    private String companyTime;

    @Column(name = "company_description")
    private String companyDescription;

    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "book_time")
    private String bookTime;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "comapny_image")
    private String companyImage;

    @OneToMany(mappedBy = "seller")
    private List<SellerCategory> sellerCategories;

    @Column(name = "review_count")
    @ColumnDefault("0")
    private Long reviewCount;

    @ColumnDefault("0")
    @Column(name = "star_total")
    private Long starTotal;
    private Double lat;
    private Double lng;
    private Integer point;

    public void updateSellerDescription(String companyDescription){
        this.companyDescription = companyDescription;
    }
    public void updateSellerTime(String companyTime){
        this.companyTime = companyTime;
    }
    public void updateSellerBookTime(String bookTime){
        this.bookTime = bookTime;
    }

    public void updateSellerProfile(String profileImage, String companyImage, String password, String phoneNumber, String companyName, String address, String detailAddress){
        this.profileImage = profileImage;
        this.companyImage = companyImage;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this. companyName = companyName;
        this.address = address;
        this.detailAddress = detailAddress;
    }
}
