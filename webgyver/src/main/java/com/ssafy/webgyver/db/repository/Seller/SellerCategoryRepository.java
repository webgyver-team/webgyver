package com.ssafy.webgyver.db.repository.Seller;

import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.entity.SellerCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerCategoryRepository extends JpaRepository<SellerCategory, Long> {
}
