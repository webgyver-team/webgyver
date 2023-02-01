package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.customer.CustomerLoginReq;
import com.ssafy.webgyver.api.request.customer.CustomerSignUpPostReq;
import com.ssafy.webgyver.api.response.customer.CustomerCheckDuplicateRes;
import com.ssafy.webgyver.api.response.customer.CustomerLoginRes;
import com.ssafy.webgyver.api.response.customer.CustomerSignUpPostRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public interface CustomerMemberService {
    BaseResponseBody SignUpCustomer(CustomerSignUpPostReq sellerRegisterInfo);
    BaseResponseBody checkDuplicate(CustomerCheckDuplicateReq req);
    CustomerLoginRes login(CustomerLoginReq req);
}
