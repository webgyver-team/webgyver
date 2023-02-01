package com.ssafy.webgyver.api.response.common.category;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class CategoryListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    public static class Response{
        private Long idx;
        private String categoryName;
        public Response(Category entity){
            this.idx = entity.getIdx();
            this.categoryName = entity.getCategoryName();
        }
    }


    public static CategoryListRes of(Integer statusCode, String message, List<Category> categoryList) {
        List<Response> responses = new ArrayList<>();
        for (Category temp : categoryList){
            responses.add(new Response(temp));
        }
        CategoryListRes res = new CategoryListRes();
        res.getData().put("categoryList", responses);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
