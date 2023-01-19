package com.ssafy.webgyver.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Long idx;

    @ManyToOne
    @JoinColumn(name = "s_idx")
    private Seller seller;

    @ManyToOne
    @JoinColumn(name = "c_idx")
    private Customer customer;

    @Column(name = "r_time")
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDateTime reservationTime;

    @Column(name = "r_state")
    private String reservationState;

    @Column(name = "r_type")
    private String reservationType;

    @Column(name = "c_address")
    private String customerAddress;

    @Column(name = "c_detail_address")
    private String customerDetailAddress;

    @OneToOne
    @JoinColumn(name = "r_category_idx")
    private Category category;

    @Column(name = "r_price")
    private int reservationPrice;

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDateTime updatedAt;
}
