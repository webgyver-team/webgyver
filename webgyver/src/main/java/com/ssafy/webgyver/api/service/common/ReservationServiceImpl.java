package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.api.response.common.category.CategoryListRes;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.repository.common.CategoryRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ReservationServiceImpl implements ReservationService {
    final ReservationRepository reservationRepository;

    @Override
    public Reservation getReservation(long reservationIdx) {
        System.out.println("서비스까지 들어옴");
        return reservationRepository.findById(reservationIdx).get();
    }
}
