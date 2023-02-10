package com.ssafy.webgyver.api.response.seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SellerGetBookTimeRes extends DataResponseBody {
    public class Response{
        private List<BookTimeDTO> bookTimeList;
    }
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookTimeDTO{
        private String day;
        private String open;
        private String close;
        private boolean isHoliday;
    }
    public static SellerGetBookTimeRes of(Integer statusCode, String message, List<BookTimeDTO> response) {
        SellerGetBookTimeRes res = new SellerGetBookTimeRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("bookTimeList", response);
        return res;
    }
}
