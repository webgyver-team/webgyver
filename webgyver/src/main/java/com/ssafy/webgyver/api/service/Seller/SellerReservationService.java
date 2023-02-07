package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.seller.SellerIdxReq;
import com.ssafy.webgyver.api.response.seller.SellerReservationListRes;

public interface SellerReservationService {
    SellerReservationListRes getSellerReservationList(SellerIdxReq req);
}
