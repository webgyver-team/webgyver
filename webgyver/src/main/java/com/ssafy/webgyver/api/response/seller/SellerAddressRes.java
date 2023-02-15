package com.ssafy.webgyver.api.response.seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class SellerAddressRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String address;
        private String detailAddress;
        private Double lat;
        private Double lng;

    }
    public static SellerAddressRes of(Integer statusCode, String message, Response response) {
        SellerAddressRes res = new SellerAddressRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("sellerAddress", response);
        return res;
    }
}
