package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.customer.CustomerLoginReq;
import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerLoginRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.common.util.JwtTokenUtil;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.repository.customer.CustomerMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerMemberServiceImpl implements CustomerMemberService{
    final CustomerMemberRepository customerMemberRepository;
    final PasswordEncoder passwordEncoder;
    @Override
    public BaseResponseBody SignUpCustomer(CustomerSignUpPostReq customerRegisterInfo) {
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
                .cardValidity(customerRegisterInfo.getCardValidity())
                .build();
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        customerMemberRepository.save(customer);
        BaseResponseBody result = BaseResponseBody.of(200, "Success");
        return result;
    }

    @Override
    public BaseResponseBody payTest(CustomerSignUpPostReq req) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("cardNumber", req.getCardNumber());
        map.add("cardExpirationYear", req.getCardValidity().substring(2, 4));
        map.add("cardExpirationMonth", req.getCardValidity().substring(0, 2));
        map.add("cardPassword", "12");
        map.add("customerIdentityNumber", req.getCardValidity());
        map.add("customerKey", "test");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "test_ck_d26DlbXAaV0j0ZWLKWx8qY50Q9RB");
        headers.add("Content-Type", "application/json");

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);
        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = rt.exchange("https://api.tosspayments.com/v1/billing/authorizations/card", HttpMethod.POST, entity, String.class);

        System.out.println("response: " + response.getBody());

        return null;
    }

    @Override
    public BaseResponseBody checkDuplicate(CustomerCheckDuplicateReq req) {
        Optional<Customer> check = customerMemberRepository.findCustomerById(req.getId());
        if (!check.isPresent()){
            return BaseResponseBody.of(200, "사용 가능한 아이디");
        } else {
            return BaseResponseBody.of(201, "중복된 아이디");
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
