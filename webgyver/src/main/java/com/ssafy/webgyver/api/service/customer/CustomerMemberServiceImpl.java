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
import org.json.simple.JSONObject;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
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
        try {
            URL url = new URL("https://api.tosspayments.com/v1/billing/authorizations/card");

            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Basic dGVzdF9za19CRTkyTEFhNVBWYjFFWmFSS0dZMzdZbXBYeUpqOg==");
            connection.setDoOutput(true);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("cardNumber", req.getCardNumber());
            jsonObject.put("cardExpirationYear", req.getCardValidity().substring(2, 4));
            jsonObject.put("cardExpirationMonth", req.getCardValidity().substring(0, 2));
            jsonObject.put("cardPassword", "12"); //비밀번호 앞 2자리
            jsonObject.put("customerIdentityNumber", req.getBirthDay());
            jsonObject.put("customerKey", "test"); //고객 ID, 무작위값 설정하여 사용

            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.writeBytes(jsonObject.toString());
            outputStream.flush();
            outputStream.close();

            Map<String, String> map = new HashMap<>();
            int respCode = connection.getResponseCode(); // New items get NOT_FOUND on PUT

            if (respCode == HttpURLConnection.HTTP_OK) {
                StringBuilder response = new StringBuilder();
                String line;

                // Read input data stream.
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                while ((line = reader.readLine()) != null) {
                    response.append(line).append('\n');
                }
                reader.close();
                map.put("response", response.toString());
            } else {
                map.put("error", connection.getResponseCode() + " " + connection.getResponseMessage());
            }

            /**
             * response
             * {
             *     "mId": "tvivarepublica4",
             *     "customerKey": "test", //저장 필요 - 이후 자동결제 시 필요
             *     "authenticatedAt": "2023-02-06T22:34:55.235307+09:00",
             *     "method": "카드",
             *     "billingKey": "JQFG7vbvL6xRfn0K5cilsxODHSdiIVHdmQLbVs62fSE=", //저장 필요 - 이후 자동결제 시 필요
             *     "cardCompany": "농협",
             *     "cardNumber": "54611120****611*",
             *     "card": {
             *         "issuerCode": "91",
             *         "acquirerCode": "91",
             *         "number": "54611120****611*",
             *         "cardType": "체크",
             *         "ownerType": "개인"
             *     }
             * }
             */


            System.out.println(map);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public BaseResponseBody requestPay(String customerKey, String billingKey) {
        try {
            URL url = new URL("https://api.tosspayments.com/v1/billing/" + billingKey);

            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Basic dGVzdF9za19CRTkyTEFhNVBWYjFFWmFSS0dZMzdZbXBYeUpqOg==");
            connection.setDoOutput(true);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("customerKey", customerKey);
            jsonObject.put("amount", 1500); //가격
            jsonObject.put("orderId", "testOrderId"); //주문 ID - 무작위값 설정하여 사용
            jsonObject.put("orderName", "12"); //주문 명

            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.writeBytes(jsonObject.toString());
            outputStream.flush();
            outputStream.close();

            Map<String, String> map = new HashMap<>();
            int respCode = connection.getResponseCode(); // New items get NOT_FOUND on PUT

            if (respCode == HttpURLConnection.HTTP_OK) {
                StringBuilder response = new StringBuilder();
                String line;

                // Read input data stream.
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                while ((line = reader.readLine()) != null) {
                    response.append(line).append('\n');
                }
                reader.close();
                map.put("response", response.toString());
            } else {
                map.put("error", connection.getResponseCode() + " " + connection.getResponseMessage());
            }

            /**
             * response
             * {
             *     "mId": "tvivarepublica2",
             *     "lastTransactionKey": "68A06A34234613A6C40059A5CDDDAB60",
             *     "paymentKey": "MKlA4XDvdYoEjb0gm23PjJqqpxv5MgrpGwBJn5eya1RPQkx9", //결제내역 조회 시 필요
             *     "orderId": "order2",
             *     "orderName": "orderName1",
             *     "taxExemptionAmount": 0,
             *     "status": "DONE",
             *     "requestedAt": "2023-02-06T22:42:59+09:00",
             *     "approvedAt": "2023-02-06T22:43:00+09:00",
             *     "useEscrow": false,
             *     "cultureExpense": false,
             *     "card": {
             *         "issuerCode": "91",
             *         "acquirerCode": "91",
             *         "number": "54611120****611*",
             *         "installmentPlanMonths": 0,
             *         "isInterestFree": false,
             *         "interestPayer": null,
             *         "approveNo": "00000000",
             *         "useCardPoint": false,
             *         "cardType": "체크",
             *         "ownerType": "개인",
             *         "acquireStatus": "READY",
             *         "amount": 1500
             *     },
             *     "virtualAccount": null,
             *     "transfer": null,
             *     "mobilePhone": null,
             *     "giftCertificate": null,
             *     "cashReceipt": null,
             *     "discount": null,
             *     "cancels": null,
             *     "secret": null,
             *     "type": "BILLING",
             *     "easyPay": null,
             *     "country": "KR",
             *     "failure": null,
             *     "isPartialCancelable": true,
             *     "receipt": {
             *         "url": "https://dashboard.tosspayments.com/sales-slip?transactionId=xIXYgxY0lGGQAYIHgT70rFbV8MXpMFamyf0ZP5tT%2FZZyBYo7JnuMyAiPOhTg%2BVK8&ref=PX"
             *     },
             *     "checkout": {
             *         "url": "https://api.tosspayments.com/v1/payments/MKlA4XDvdYoEjb0gm23PjJqqpxv5MgrpGwBJn5eya1RPQkx9/checkout"
             *     },
             *     "currency": "KRW",
             *     "totalAmount": 1500,
             *     "balanceAmount": 1500,
             *     "suppliedAmount": 1364,
             *     "vat": 136,
             *     "taxFreeAmount": 0,
             *     "method": "카드",
             *     "version": "2022-11-16"
             * }
             */

            System.out.println(map);
        } catch (Exception e) {
            e.printStackTrace();
        }

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
