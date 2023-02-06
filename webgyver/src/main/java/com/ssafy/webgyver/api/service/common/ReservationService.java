package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.db.entity.Reservation;

public interface ReservationService {
    Reservation getReservation(long reservationIdx);
}
