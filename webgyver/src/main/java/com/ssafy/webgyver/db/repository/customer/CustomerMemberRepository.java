package com.ssafy.webgyver.db.repository.customer;

import com.ssafy.webgyver.db.entity.Customer;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerMemberRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findCustomerById(String id);


}
