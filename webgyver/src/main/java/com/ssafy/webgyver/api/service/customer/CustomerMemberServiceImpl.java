package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.customer.CustomerLoginReq;
import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerLoginRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.common.util.JwtTokenProvider;
import com.ssafy.webgyver.common.util.JwtTokenUtil;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.RoleType;
import com.ssafy.webgyver.db.repository.customer.CustomerMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Collections;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomerMemberServiceImpl implements CustomerMemberService{
    private final CustomerMemberRepository customerMemberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Value("${properties.file.toss.secret}")
    String tossKey;
    @Override
    public BaseResponseBody SignUpCustomer(CustomerSignUpPostReq customerRegisterInfo) {
        String customerBirth = customerRegisterInfo.getBirthDay();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        //userid + cardnum으로 base64 써서 customerkey 만들기
        String customerKey = new String(Base64.getEncoder().encode((customerRegisterInfo.getId() + customerRegisterInfo.getCardNumber()).getBytes()));
        BaseResponseBody resultBilling = registerCard(customerKey, customerRegisterInfo);

        if(resultBilling.getStatusCode() != 200)
            return resultBilling;

        Customer customer = Customer.builder()
                .id(customerRegisterInfo.getId())
                .password(passwordEncoder.encode(customerRegisterInfo.getPassword()))
                .name(customerRegisterInfo.getName())
                .birthDay(LocalDate.parse(customerBirth.substring(0,8), formatter))
                .gender(customerBirth.substring(8))
                .phoneNumber(customerRegisterInfo.getPhoneNumber())
                .cardNumber(customerRegisterInfo.getCardNumber())
                .cardValidity(customerRegisterInfo.getCardValidity())
                .customerKey(customerKey)
                .billingKey(resultBilling.getMessage())
                .roles(Collections.singletonList(RoleType.CUSTOMER.name()))
                .build();

        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        customerMemberRepository.save(customer);

        return BaseResponseBody.of(200, "Success");
    }

    private BaseResponseBody registerCard(String customerKey, CustomerSignUpPostReq req) {
        try {
            URL url = new URL("https://api.tosspayments.com/v1/billing/authorizations/card");

            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", tossKey);
            connection.setDoOutput(true);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("cardNumber", req.getCardNumber());
            jsonObject.put("cardExpirationYear", req.getCardValidity().substring(2, 4));
            jsonObject.put("cardExpirationMonth", req.getCardValidity().substring(0, 2));
            jsonObject.put("customerIdentityNumber", req.getBirthDay().substring(2, 8));
            jsonObject.put("customerKey", customerKey); //고객 ID, 무작위값 설정하여 사용

            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.writeBytes(jsonObject.toString());
            outputStream.flush();
            outputStream.close();

            int respCode = connection.getResponseCode(); // New items get NOT_FOUND on PUT

            if (respCode == HttpURLConnection.HTTP_OK) {
                // Read input data stream.
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                JSONParser parser = new JSONParser();
                JSONObject resObject = (JSONObject) parser.parse(reader.readLine());

                reader.close();

                return BaseResponseBody.of(200, resObject.get("billingKey").toString());

            } else {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                JSONParser parser = new JSONParser();
                JSONObject resObject = (JSONObject) parser.parse(reader.readLine());

                return BaseResponseBody.of(204, resObject.get("message").toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponseBody.of(500, "Fail");
        }
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

        Optional<Customer> customer = customerMemberRepository.findCustomerById(userId);
        if (!customer.isPresent()) {
            return CustomerLoginRes.of(201, "해당하는 유저가 존재하지 않습니다.", null, null);
        }

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, customer.get().getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, password);

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            return CustomerLoginRes.of(200, "Success", jwtTokenProvider.generateToken(
                   authentication),customer.get().getIdx());
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return CustomerLoginRes.of(401, "Invalid Password", null, null);
    }
}
