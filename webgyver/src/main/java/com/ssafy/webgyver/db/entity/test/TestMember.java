package com.ssafy.webgyver.db.entity.test;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="test_member")
public class TestMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String username;
    private String password;
    private Integer age;
    @Enumerated(EnumType.STRING)
    private RoleType roleType;
//    @Column(default now)
    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDate createdDate;
//    @Column(default now)
    @LastModifiedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm")
    private LocalDate lastModifiedDate;
    @Lob
    private String description;
}
