package com.ssafy.webgyver.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "seller")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Long idx;

    private String id;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

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

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDateTime updatedAt;

}
