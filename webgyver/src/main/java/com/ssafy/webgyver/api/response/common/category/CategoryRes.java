package com.ssafy.webgyver.api.response.common.category;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CategoryRes extends DataResponseBody {

    @Getter
    @NoArgsConstructor
    public static class SimpleCategory {
        private Long idx;
        private String categoryName;

        public SimpleCategory(Category entity) {
            this.idx = entity.getIdx();
            this.categoryName = entity.getCategoryName();
        }
    }

    public static CategoryRes of(Integer statusCode, String message, Category category) {
        CategoryRes res = new CategoryRes();
        res.getData().put("category", new SimpleCategory(category));
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
