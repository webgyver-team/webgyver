package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.repository.customer.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerMypageService {
    final CustomerRepository customerRepository;
    @Override
    public Customer getProfile(Long idx) {
        Optional<Customer> customer = customerRepository.findByIdx(idx);

        return customer.orElse(null);
    }
}
