package com.ssafy.webgyver.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="article")
@ToString
public class Article extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Long idx;

//    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_idx", nullable = true)
    private Reservation reservation;

    private String title;

    private String content;

    @Column(name = "type")
    // 0 이상 -> 판매자의 idx(수리사례, idx)
    // -1 -> 문의내용
    // -2 -> 대댓글
    // -3 -> 리뷰, 별점 1개
    // -4 -> 리뷰, 별점 2개
    // -5 -> 리뷰, 별점 3개
    // -6 -> 리뷰, 별점 4개
    // -7 -> 리뷰, 별점 5개
    private Long type;
}
