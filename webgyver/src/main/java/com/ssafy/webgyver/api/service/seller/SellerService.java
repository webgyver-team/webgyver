package com.ssafy.webgyver.api.service.seller;

import com.ssafy.webgyver.api.request.seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.seller.SellerLoginRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public interface SellerService {

    BaseResponseBody SignUpSeller(SellerSignUpPostReq sellerRegisterInfo);
    BaseResponseBody checkDuplicate(SellerCheckDuplicateReq req);
    SellerLoginRes login(SellerLoginReq req);
}
