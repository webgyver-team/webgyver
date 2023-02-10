package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

public class CustomerReservationEndInfoRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private String companyName;
        private String sellerName;
        private String title;
        private Integer price;

    }

    public static CustomerReservationEndInfoRes of(Integer statusCode, String message) {
        CustomerReservationEndInfoRes res = new CustomerReservationEndInfoRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;

    }

    public static CustomerReservationEndInfoRes of(Integer statusCode, String message, Map<String, Object> response) {
        CustomerReservationEndInfoRes res = new CustomerReservationEndInfoRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("data", Response
                .builder()
                .companyName((String) response.get("companyName"))
                .sellerName((String) response.get("sellerName"))
                .title((String) response.get("title"))
                .price(((int) response.get("price")))
                .build()
        );

        return res;
    }
}
