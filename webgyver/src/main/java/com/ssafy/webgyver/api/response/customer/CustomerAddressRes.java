package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class CustomerAddressRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String address;
        private String detailAddress;
        private Double lat;
        private Double lng;

    }
    public static CustomerAddressRes of(Integer statusCode, String message, Response response) {
        CustomerAddressRes res = new CustomerAddressRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("customerAddress", response);
        return res;
    }
}
