package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.seller.SellerIdxReq;
import com.ssafy.webgyver.api.response.customer.CustomerReservationListRes;
import com.ssafy.webgyver.api.response.seller.SellerReservationListRes;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerReservationServiceImpl implements SellerReservationService{
    final ReservationRepository reservationRepository;
    final PictureRepository pictureRepository;


    static List<SellerReservationListRes.ReservationDTO> proceedingList;
    static List<SellerReservationListRes.ReservationDTO> waitingList;
    static List<SellerReservationListRes.ReservationDTO> todayList;
    @Override
    public SellerReservationListRes getSellerReservationList(SellerIdxReq req) {
        System.out.println(req.getSellerIdx());
        // 현재 진행중인 상담
        List<Reservation> reservationList  = reservationRepository.findReservationsBySellerIdxAndReservationStateOrderByReservationTimeDesc(req.getSellerIdx(), "4");
        proceedingList = new ArrayList<>();
        reservationState4ListMethod(reservationList);
        System.out.println(proceedingList);
        //

        return null;
    }
    public void reservationState4ListMethod(List<Reservation> reservationList) {
        System.out.println("메소드 들어옴");
        LocalDateTime currentTime = LocalDateTime.now();
        for (Reservation reservation : reservationList) {
            // 상담 시간 지났으면 종료로 보냄
            if (!reservation.getReservationTime().plusMinutes(15).isAfter(currentTime)) {
                System.out.println("변경 로직 들어옴");
                reservation.updateReservationState("5");
                reservationRepository.save(reservation);
            } else {
                String title = null;    // 예약 제목
                String content = null; // 문의 내용
                List<SellerReservationListRes.PictureDTO> pictureDTOS = new ArrayList<>();
                // 문의 내용 찾기
                for (Article review : reservation.getArticleList()) {
                    if (review.getType() == -1) {
                        title = review.getTitle();
                        content = review.getContent();
                        List<Picture> pictures = pictureRepository.findPicturesByArticleIdx(
                                review.getIdx());
                        // 문의 내용에대한 사진 가져오기
                        for (Picture picture : pictures) {
                            SellerReservationListRes.PictureDTO pictureTemp = new SellerReservationListRes.PictureDTO(
                                    picture.getIdx(), picture.getOriginName(),
                                    picture.getSaveName());
                            pictureDTOS.add(pictureTemp);
                        }
                        break;
                    }
                }
                SellerReservationListRes.ReservationDTO reservationDTO = new SellerReservationListRes.ReservationDTO(
                        reservation.getIdx(),
                        title,
                        reservation.getReservationTime(),
                        content,
                        reservation.getSeller().getCompanyName(),
                        pictureDTOS,
                        reservation.getReservationState(),
                        reservation.getReservationType()
                );
                proceedingList.add(reservationDTO);
            }
        }
    }
}
