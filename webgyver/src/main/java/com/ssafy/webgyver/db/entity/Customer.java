package com.ssafy.webgyver.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
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
@Setter
@Entity
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "customer")
public class Customer extends BaseEntity implements UserDetails {
    @Column(unique = true)
    private String id;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

    @Column(name = "birth_day")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDay;

    private String gender;

    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "card_cvc")
    private String cardCvc;

    @Column(name = "card_validity")
    private String cardValidity;

    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "customer_key")
    private String customerKey;

    @Column(name = "billing_key")
    private String billingKey;
    private Double lat;
    private Double lng;
    @JsonIgnore
    @Column
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println(roles);
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());    }
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
}
