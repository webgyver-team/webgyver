package com.ssafy.webgyver.db.entity.test;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TestCategoryMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;
//    @ManyToOne()
    @Column(name = "member_idx")
    private String memberIdx;
    @Column(name = "category_idx")
    private String categoryIdx;
    private Integer age;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDate createdDate;
    //    @Column(default now)
    @LastModifiedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDate lastModifiedDate;
    @Lob
    private Integer price;
}
