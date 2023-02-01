package com.ssafy.webgyver.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Long idx;
    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(mappedBy = "category")
    private List<SellerCategory> categoryList = new ArrayList<>();

}
