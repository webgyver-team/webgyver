package com.ssafy.webgyver.api.controller.common;

import com.ssafy.webgyver.api.response.common.category.CategoryListRes;
import com.ssafy.webgyver.api.service.common.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/common")
public class CommonController {
    final CommonService commonService;
    @GetMapping("/category/list")
    public ResponseEntity<CategoryListRes> getCategoryList() {
        log.info("카테고리/리스트 요청");
        return ResponseEntity.ok(commonService.getCategoryList());
    }
}
