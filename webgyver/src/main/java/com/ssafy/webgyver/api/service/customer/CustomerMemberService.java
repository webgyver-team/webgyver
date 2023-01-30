package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.customer.CustomerLoginReq;
import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerCheckDuplicateRes;
import com.ssafy.webgyver.api.response.customer.CustomerLoginRes;
import com.ssafy.webgyver.api.response.customer.CustomerSignUpPostRes;

public interface CustomerMemberService {
    CustomerSignUpPostRes SignUpCustomer(CustomerSignUpPostReq sellerRegisterInfo);
    CustomerCheckDuplicateRes checkDuplicate(CustomerCheckDuplicateReq req);
    CustomerLoginRes login(CustomerLoginReq req);
}
