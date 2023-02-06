package com.ssafy.webgyver.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
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

    @Builder.Default
    @OneToMany(mappedBy = "category")
    private List<SellerCategory> categoryList = new ArrayList<>();

}
