package com.ssafy.webgyver.api.response.common.category;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class CategoryListRes extends DataResponseBody {
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


    public static CategoryListRes of(Integer statusCode, String message, List<Category> categoryList) {
        List<SimpleCategory> simpleCategoryList = categoryList.stream().map(SimpleCategory::new).collect(Collectors.toList());
        CategoryListRes res = new CategoryListRes();
        res.getData().put("categoryList", simpleCategoryList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
