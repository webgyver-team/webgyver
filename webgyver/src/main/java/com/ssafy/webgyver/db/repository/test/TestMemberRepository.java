package com.ssafy.webgyver.db.repository.test;

import com.ssafy.webgyver.db.entity.test.TestMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public interface TestMemberRepository extends JpaRepository<TestMember, Long> {
//    @PersistenceContext
//    private EntityManager em;
}
