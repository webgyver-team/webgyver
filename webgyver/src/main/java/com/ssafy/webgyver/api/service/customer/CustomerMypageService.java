package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerMypageProfileReq;
import com.ssafy.webgyver.db.entity.Customer;

public interface CustomerMypageService {
    Customer getProfile(Long idx);

    Customer setProfile(CustomerMypageProfileReq req);
}
