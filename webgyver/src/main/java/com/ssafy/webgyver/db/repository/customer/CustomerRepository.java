package com.ssafy.webgyver.db.repository.customer;

import com.ssafy.webgyver.db.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByIdx(Long idx);
}
