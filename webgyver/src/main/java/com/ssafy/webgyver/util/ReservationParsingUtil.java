package com.ssafy.webgyver.util;

import com.ssafy.webgyver.api.request.common.reservation.ReservationAllReq;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.Reservation;

public class ReservationParsingUtil {
    public static Reservation parseReservationReq2Reservation(ReservationAllReq req) {
        Reservation result = new Reservation();
        Customer customer = Customer.builder().build();
        customer.setIdx(req.getCustomerIdx());

        result.setCustomerAddress(req.getAddress());
        result.setCustomerDetailAddress(req.getDetailAddress());
        result.setCustomer(customer);
        result.setReservationTime(TimeUtil.string2Time(req.getTime()));

        return result;
    }
}
