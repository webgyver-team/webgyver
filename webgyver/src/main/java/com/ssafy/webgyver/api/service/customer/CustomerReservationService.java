package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.common.reservation.ReservationAllReq;
import com.ssafy.webgyver.api.request.customer.CustomerIdxReq;
import com.ssafy.webgyver.api.request.customer.CustomerReservationNormalListReq;
import com.ssafy.webgyver.api.response.customer.CustomerReservationListRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationNormalListRes;
import com.ssafy.webgyver.db.entity.Reservation;

public interface CustomerReservationService {
    Reservation save(ReservationAllReq req);
    public CustomerReservationNormalListRes getOrderedStoreList(String order, CustomerReservationNormalListReq req);
    CustomerReservationListRes getCustomerReservationList(CustomerIdxReq req);
}
