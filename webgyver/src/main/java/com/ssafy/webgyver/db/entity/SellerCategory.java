package com.ssafy.webgyver.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name="seller_category")
public class SellerCategory extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "s_idx")
    private Seller seller;

    @ManyToOne
    @JoinColumn(name = "category_idx")
    private Category category;

    private Integer price;

}
