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
public class CategoryListRes extends DataResponseBody {
    public static CategoryListRes of(Integer statusCode, String message, List<Category> categoryList) {
        CategoryListRes res = new CategoryListRes();
        res.getData().put("categoryList", categoryList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
