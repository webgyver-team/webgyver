package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CustomerReservationNormalListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Store {
        private List<String> images;
    }


    public static CustomerReservationNormalListRes of(Integer statusCode, String message, Customer profile) {
        CustomerReservationNormalListRes res = new CustomerReservationNormalListRes();
//        res.setStatusCode(statusCode);
//        res.setMessage(message);
//
//        Response response = new Response(profile);
//        res.getData().put("customer", response);

        return res;
    }
}
