package com.ssafy.webgyver.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "seller")
@DynamicInsert
@ToString
public class Seller extends BaseEntity implements UserDetails {

    @Column(unique = true, length = 50)
    private String id;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    @Column(name = "representative_name")
    String representativeName;


    @Column(name = "birth_day")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDay;

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
    @JsonIgnore
    @Column
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<String> roles = new ArrayList<>();


    public void updateSellerDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public void updateSellerTime(String companyTime) {
        this.companyTime = companyTime;
    }

    public void updateSellerBookTime(String bookTime) {
        this.bookTime = bookTime;
    }

    public void updateSellerProfile(String profileImage, String companyImage, String password, String phoneNumber, String companyName, String address, String detailAddress) {
        this.profileImage = profileImage;
        this.companyImage = companyImage;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.companyName = companyName;
        this.address = address;
        this.detailAddress = detailAddress;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void addReview(long star) {
        this.reviewCount++;
        this.starTotal += star;
    }

    public void deleteReview(long star) {
        this.reviewCount--;
        this.starTotal -= star;
    }

    public void updateReview(long beforeStar, long afterStar) {
        this.starTotal -= beforeStar;
        this.starTotal += afterStar;
    }

    public void updatePoint(int point) {
        this.point += point;
    }
}
