package com.ssafy.webgyver.db.repository.Seller;

import com.ssafy.webgyver.db.entity.Seller;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Optional<Seller> findByIdAndPassword(String name, String password);
    boolean existsById(String id);

    Optional<Seller> findSellerById(String id);
    Seller findSellerByIdx(Long idx);
}
