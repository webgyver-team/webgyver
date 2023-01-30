package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.db.entity.Customer;

public interface CustomerMypageService {
    Customer getProfile(Long idx);
}
