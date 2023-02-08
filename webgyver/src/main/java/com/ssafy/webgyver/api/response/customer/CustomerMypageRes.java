package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class CustomerMypageRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Response {
        private Long idx;
        private String name;
        private String phoneNumber;
        private String birth;
        private String cardNumber;
        private String cardValidity;

        public Response(Customer customer) {
            this.idx = customer.getIdx();
            this.name = customer.getName();
            this.phoneNumber = customer.getPhoneNumber();
            this.cardNumber = customer.getCardNumber();
            this.cardValidity = customer.getCardValidity();

            String birth = customer.getBirthDay().format(DateTimeFormatter.ofPattern("yyMMdd"));
            this.birth = birth + customer.getGender();
        }
    }

    public static CustomerMypageRes of(Integer statusCode, String message, Customer profile) {
        CustomerMypageRes res = new CustomerMypageRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        Response response = new Response(profile);
        res.getData().put("customer", response);

        return res;
    }
}
