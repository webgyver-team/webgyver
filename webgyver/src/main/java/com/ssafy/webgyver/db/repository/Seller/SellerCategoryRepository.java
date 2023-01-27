package com.ssafy.webgyver.db.repository.Seller;

import com.ssafy.webgyver.db.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerCategoryRepository extends JpaRepository<Seller, Long> {
}
