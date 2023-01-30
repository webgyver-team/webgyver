package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.Seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.Seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.Seller.SellerLoginRes;
import com.ssafy.webgyver.db.entity.Seller;

public interface SellerService {

    Seller SignUpSeller(SellerSignUpPostReq sellerRegisterInfo);
    boolean checkDuplicate(SellerCheckDuplicateReq req);
    SellerLoginRes login(SellerLoginReq req);
}
