package com.ssafy.webgyver.db.repository.common;

import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findReservationsByCustomerIdx(Long idx);
    List<Reservation> findReservationsBySellerAndReservationTimeBetween(Seller seller, LocalDateTime start, LocalDateTime end);
    List<Reservation> findReservationsByCustomerIdxOrderByIdxDesc(Long idx);
}
