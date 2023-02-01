package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.customer.CustomerLoginReq;
import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerCheckDuplicateRes;
import com.ssafy.webgyver.api.response.customer.CustomerLoginRes;
import com.ssafy.webgyver.api.response.customer.CustomerSignUpPostRes;
import com.ssafy.webgyver.common.util.JwtTokenUtil;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.repository.customer.CustomerMemberRepository;
import java.util.Optional;
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
        Optional<Customer> check = customerMemberRepository.findCustomerById(req.getId());
        if (!check.isPresent()){
            return CustomerCheckDuplicateRes.of(200, "사용 가능한 아이디");
        } else {
            return CustomerCheckDuplicateRes.of(201, "중복된 아이디");
        }
    }

    @Override
    public CustomerLoginRes login(CustomerLoginReq req) {
        String userId = req.getId();
        String password = req.getPassword();

        Customer customer = customerMemberRepository.findCustomerById(userId).get();
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, customer.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return CustomerLoginRes.of(200, "Success", JwtTokenUtil.getToken(
                    String.valueOf(customer.getIdx())));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return CustomerLoginRes.of(401, "Invalid Password", null);
    }
}
