package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerMypageProfileReq;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.repository.customer.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    @Transactional
    @Override
    public Customer setProfile(CustomerMypageProfileReq req) {
        Customer customer = customerRepository.findByIdx(req.getIdx()).get();
        customer.setName(req.getName());
        customer.setPhoneNumber(req.getPhoneNumber());
        customer.setCardNumber(req.getCardNumber());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        customer.setBirthDay(LocalDate.parse(req.getBirth(), formatter).atStartOfDay());

        return customer;
    }
}

