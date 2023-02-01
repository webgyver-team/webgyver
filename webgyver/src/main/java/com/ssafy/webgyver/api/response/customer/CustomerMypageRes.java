package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Customer;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class CustomerMypageRes extends DataResponseBody {
    public static CustomerMypageRes of(Integer statusCode, String message, Customer profile) {
        CustomerMypageRes res = new CustomerMypageRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        Map<String, Object> map = new HashMap<>();
        map.put("idx", profile.getIdx());
        map.put("name", profile.getName());
        map.put("phoneNumber", profile.getPhoneNumber());
        map.put("birth", profile.getBirthDay());
        map.put("cardNumber", profile.getCardNumber());
        map.put("profileImage", profile.getProfileImage());

        res.getData().put("customer", map);

        return res;
    }
}