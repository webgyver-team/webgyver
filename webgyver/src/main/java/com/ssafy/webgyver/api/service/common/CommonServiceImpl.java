package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.api.response.common.category.CategoryListRes;
import com.ssafy.webgyver.db.repository.common.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommonServiceImpl implements CommonService {
    final CategoryRepository categoryRepository;

    @Override
    public CategoryListRes getCategoryList() {
        return CategoryListRes.of(200, "Success", categoryRepository.findAll());
    }
}
