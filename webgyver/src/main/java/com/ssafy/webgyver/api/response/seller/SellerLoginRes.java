package com.ssafy.webgyver.api.response.seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerLoginRes extends DataResponseBody {
    public static SellerLoginRes of(Integer statusCode, String message, String accessToken) {
        SellerLoginRes res = new SellerLoginRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("access-token", accessToken);
        return res;
    }
}
