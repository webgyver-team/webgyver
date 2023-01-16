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
public class SellerCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idx")
    private Long idx;

    @ManyToOne
    @JoinColumn(name = "s_idx")
    private Seller seller;

    @ManyToOne
    @JoinColumn(name = "category_idx")
    private Category category;

    private Integer price;

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDateTime updatedAt;
}
