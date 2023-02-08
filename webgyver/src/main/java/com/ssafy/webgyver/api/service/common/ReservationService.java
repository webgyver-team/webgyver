package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.db.entity.Reservation;

import java.time.LocalDateTime;

public interface ReservationService {
    Reservation getReservation(long reservationIdx);

    void updateReservation2Meet(long reservationIdx, LocalDateTime time);
}
