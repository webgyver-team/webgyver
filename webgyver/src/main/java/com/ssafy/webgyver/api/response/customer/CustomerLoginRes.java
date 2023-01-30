package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerLoginRes extends DataResponseBody {
    public static CustomerLoginRes of(Integer statusCode, String message, String accessToken) {
        CustomerLoginRes res = new CustomerLoginRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("access-token", accessToken);
        return res;
    }
}
