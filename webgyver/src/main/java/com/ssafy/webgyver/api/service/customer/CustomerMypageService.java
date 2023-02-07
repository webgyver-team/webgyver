package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerMypageReq;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Customer;

import java.util.List;
import java.util.Map;

public interface CustomerMypageService {
    Customer getProfile(Long idx);

    BaseResponseBody setProfile(CustomerMypageReq req);

    List<Map<String, Object>> getReviewList(CustomerMypageReq req);
}
