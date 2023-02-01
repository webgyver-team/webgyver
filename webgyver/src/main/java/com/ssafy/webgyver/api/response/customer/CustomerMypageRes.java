package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CustomerMypageRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Response {
        private Long idx;
        private String name;
        private String phoneNumber;
        private LocalDateTime birth;
        private String cardNumber;
        private String profileImage;

        public Response(Customer customer) {
            this.idx = customer.getIdx();
            this.name = customer.getName();
            this.phoneNumber = customer.getPhoneNumber();
            this.birth = customer.getBirthDay();
            this.cardNumber = customer.getCardNumber();
            this.profileImage = customer.getProfileImage();
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
