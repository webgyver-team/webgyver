package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.seller.SellerLoginRes;
import com.ssafy.webgyver.db.entity.Seller;

public interface SellerService {

    Seller SignUpSeller(SellerSignUpPostReq sellerRegisterInfo);
    boolean checkDuplicate(SellerCheckDuplicateReq req);
    SellerLoginRes login(SellerLoginReq req);
}
