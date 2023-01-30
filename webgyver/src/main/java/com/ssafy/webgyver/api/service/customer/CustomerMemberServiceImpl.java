package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.customer.CustomerLoginReq;
import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerCheckDuplicateRes;
import com.ssafy.webgyver.api.response.customer.CustomerLoginRes;
import com.ssafy.webgyver.api.response.customer.CustomerSignUpPostRes;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.repository.customer.CustomerMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerMemberServiceImpl implements CustomerMemberService{
    final CustomerMemberRepository customerMemberRepository;
    final PasswordEncoder passwordEncoder;
    @Override
    public CustomerSignUpPostRes SignUpCustomer(CustomerSignUpPostReq customerRegisterInfo) {
        String customerBirth = customerRegisterInfo.getBirthDay();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        Customer customer = Customer.builder()
                .id(customerRegisterInfo.getId())
                .password(passwordEncoder.encode(customerRegisterInfo.getPassword()))
                .name(customerRegisterInfo.getName())
                .birthDay(LocalDate.parse(customerBirth.substring(0,8), formatter).atStartOfDay())
                .gender(customerBirth.substring(8))
                .phoneNumber(customerRegisterInfo.getPhoneNumber())
                .cardNumber(customerRegisterInfo.getCardNumber())
                .cardCvc(customerRegisterInfo.getCardCvc())
                .cardValidity(LocalDate.parse(customerRegisterInfo.getCardValidity(), formatter).atStartOfDay())
                .build();
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        customerMemberRepository.save(customer);
        CustomerSignUpPostRes result = CustomerSignUpPostRes.of(200, "Success");
        return result;
    }

    @Override
    public CustomerCheckDuplicateRes checkDuplicate(CustomerCheckDuplicateReq req) {
        return null;
    }

    @Override
    public CustomerLoginRes login(CustomerLoginReq req) {
        return null;
    }
}
