package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ReservationServiceImpl implements ReservationService {
    final ReservationRepository reservationRepository;

    @Override
    public Optional<Reservation> getReservation(long reservationIdx) {
        return reservationRepository.findById(reservationIdx);
    }

    public void updateReservation2Meet(long reservationIdx, LocalDateTime time) {
        Reservation reservation = reservationRepository.findById(reservationIdx).get();
        reservation.setReservationTime(time);
        reservation.setReservationType("3");
        reservation.setReservationState("2");
        reservationRepository.save(reservation);
    }

    @Override
    public void updateReservationFinished(long reservationIdx) {
        Reservation reservation = reservationRepository.findById(reservationIdx).get();
        reservation.setReservationState("5");
        reservationRepository.save(reservation);
    }
}
