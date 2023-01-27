package com.ssafy.webgyver.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class Seller extends BaseEntity{

    @Column(unique = true)
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

    @Lob
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

    @OneToMany(mappedBy = "selleres")
    private List<SellerCategory> category = new ArrayList<>();

}
