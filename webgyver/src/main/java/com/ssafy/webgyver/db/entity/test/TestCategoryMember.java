package com.ssafy.webgyver.db.entity.test;

import com.ssafy.webgyver.db.entity.BaseEntity;
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
public class TestCategoryMember extends BaseEntity {

//    @ManyToOne()
    @Column(name = "member_idx")
    private String memberIdx;
    @Column(name = "category_idx")
    private String categoryIdx;
    private Integer age;
    @Lob
    private Integer price;
}
