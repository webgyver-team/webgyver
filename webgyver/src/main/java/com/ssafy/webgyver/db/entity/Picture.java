package com.ssafy.webgyver.db.entity;

import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.BaseEntity;
import com.ssafy.webgyver.db.entity.Reservation;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "picture")
public class Picture extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Long idx;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_idx", nullable = false)
    private Article article;

    @Column(name = "origin_name")
    private String originName;


    @Column(name = "save_name")
    private String saveName;
}
