package com.ssafy.webgyver.db.repository.common;

import com.ssafy.webgyver.db.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findReservationsByCustomerIdx(Long idx);
}
