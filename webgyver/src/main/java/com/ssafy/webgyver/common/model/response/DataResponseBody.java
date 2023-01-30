package com.ssafy.webgyver.common.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class DataResponseBody extends BaseResponseBody {
    Map<String, Object> data;

    public DataResponseBody() {
        data = new HashMap<>();
    }

}
