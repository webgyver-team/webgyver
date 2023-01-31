package com.ssafy.webgyver.api.response.common.category;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CategoryRes extends DataResponseBody {
    public static CategoryRes of(Integer statusCode, String message, Category category) {
        CategoryRes res = new CategoryRes();
        res.getData().put("category", category);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
