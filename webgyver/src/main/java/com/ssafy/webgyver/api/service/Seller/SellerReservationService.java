package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.seller.SellerAcceptReservationReq;
import com.ssafy.webgyver.api.request.seller.SellerCalendarReq;
import com.ssafy.webgyver.api.request.seller.SellerIdxReq;
import com.ssafy.webgyver.api.response.seller.SellerReservationListRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;

public interface SellerReservationService {
    SellerReservationListRes getSellerReservationList(SellerIdxReq req);
    BaseResponseBody updateAcceptReservation(SellerAcceptReservationReq req);

    SellerReservationListRes getSellerCalendarReservationList(SellerCalendarReq req);
}
