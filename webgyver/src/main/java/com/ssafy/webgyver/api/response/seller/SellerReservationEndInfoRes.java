package com.ssafy.webgyver.api.response.seller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.webgyver.common.model.response.DataResponseBody;
import lombok.*;

import java.util.Map;

public class SellerReservationEndInfoRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private String title;
        private String content;
        private Integer totalPoint;
        private Integer price;
        private Meet meet;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meet {
        private String date;
        private String address;
        private String detailAddress;
        //20230203-1500
    }

    public static SellerReservationEndInfoRes of(Integer statusCode, String message) {
        SellerReservationEndInfoRes res = new SellerReservationEndInfoRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;

    }

    public static SellerReservationEndInfoRes of(Integer statusCode, String message, Map<String, Object> response) {
        SellerReservationEndInfoRes res = new SellerReservationEndInfoRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);

        Meet meet = new Meet();
        if (response.containsKey("date")) {
            meet.setDate((String) response.get("date"));
        }
        if (response.containsKey("address")) {
            meet.setAddress((String) response.get("address"));
        }
        if (response.containsKey("detailAddress")) {
            meet.setDetailAddress((String) response.get("detailAddress"));
        }
        ObjectMapper objectMapper = new ObjectMapper();
        res.setData(objectMapper.convertValue(Response
                .builder()
                .title((String) response.get("title"))
                .content((String) response.get("content"))
                .price(((int) response.get("price")))
                .totalPoint((int) response.get("price") + (int) response.get("point"))
                .meet(meet)
                .build(), Map.class));
        return res;
    }
}
