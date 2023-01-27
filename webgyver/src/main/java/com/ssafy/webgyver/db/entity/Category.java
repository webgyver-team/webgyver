package com.ssafy.webgyver.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Long idx;
    @Column(name = "category_name")
    private String categoryName;
    @OneToMany(mappedBy = "category")
    private List<SellerCategory> categories = new ArrayList<>();
}
