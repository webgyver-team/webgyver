package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.seller.SellerAcceptReservationReq;
import com.ssafy.webgyver.api.request.seller.SellerCalendarReq;
import com.ssafy.webgyver.api.request.seller.SellerIdxReq;
import com.ssafy.webgyver.api.response.seller.SellerReservationListRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerReservationServiceImpl implements SellerReservationService{
    final ReservationRepository reservationRepository;
    final PictureRepository pictureRepository;
    @Value("${properties.file.toss.secret}")
    String tossKey;

    static List<SellerReservationListRes.ReservationDTO> proceedingList;
    static List<SellerReservationListRes.ReservationDTO> waitingList;
    static List<SellerReservationListRes.ReservationDTO> todayList;
    @Override
    public SellerReservationListRes getSellerReservationList(SellerIdxReq req) {

        // 예약 대기중인 상담
        waitingList = new ArrayList<>();
        List<Reservation> reservationList = reservationRepository.findReservationsBySellerIdxAndReservationStateOrderByReservationTimeDesc(req.getSellerIdx(), "1");
        reservationState1ListMethod(reservationList);
        // 오늘 잡혀 있는 상담
        todayList = new ArrayList<>();
        LocalDateTime today = LocalDateTime.now().plusDays(1);
        reservationList = reservationRepository.findReservationsBySellerIdxAndReservationTimeBeforeAndReservationState(req.getSellerIdx(), today, "2");
        reservationState2ListMethod(reservationList);
        // 현재 진행중인 상담
        proceedingList = new ArrayList<>();
        reservationList  = reservationRepository.findReservationsBySellerIdxAndReservationStateOrderByReservationTimeDesc(req.getSellerIdx(), "4");
        reservationState4ListMethod(reservationList);
        SellerReservationListRes res = SellerReservationListRes.of(200, "Success", proceedingList, waitingList, todayList);
        return res;
    }

    @Override
    @Transactional
    public BaseResponseBody updateAcceptReservation(SellerAcceptReservationReq req) {
        LocalDateTime now = LocalDateTime.now();
        BaseResponseBody res;
        Reservation reservation = reservationRepository.findById(req.getIdx()).get();
        if (!reservation.getReservationState().equals("1")) {
            res = BaseResponseBody.of(200, "이미 상태가 변경됐습니다.");
            return res;
        }
        if (!reservation.getCreatedAt().plusMinutes(5).isAfter(now)){
            reservation.updateReservationState("3");
            reservationRepository.save(reservation);
            res = BaseResponseBody.of(200, "승낙 가능한 시간이 지났습니다.");
            return res;
        }else {
            // 승낙
            if (req.isAcceptFlag()) {
                res = BaseResponseBody.of(200, "승낙 및 결제 성공");
                String title = "";
                for (Article article : reservation.getArticleList()){
                    if (article.getType() == -1){
                        title = article.getTitle();
                    }
                }
                BaseResponseBody payRes = CommonUtil.requestPay(tossKey, reservation.getCustomer().getCustomerKey(), reservation.getCustomer().getBillingKey(), title, reservation.getReservationPrice());
                if (payRes.getStatusCode() == 200){
                    reservation.updateReservationState("2");
                    reservationRepository.save(reservation);
                    List<Reservation> reservationList = reservationRepository.findReservationsBySellerIdxAndReservationStateOrderByReservationTimeDesc(reservation.getSeller().getIdx(), "1");
                    for (Reservation tempReservation : reservationList) {
                        if (tempReservation.getIdx() == reservation.getIdx()) continue;
                        // 예약 시간이 같은데 하나 승낙 했으면 나머지 state 3으로 변경
                        if (tempReservation.getReservationTime().isEqual(reservation.getReservationTime())){
                            tempReservation.updateReservationState("3");
                            reservationRepository.save(tempReservation);
                        }
                    }
                    return res;
                } else {
                    return payRes;
                }
            }
            // 거절
            else {
                reservation.updateReservationState("3");
                reservationRepository.save(reservation);
                res = BaseResponseBody.of(200, "거절 성공");
                return res;
            }
        }
    }

    @Override
    public SellerReservationListRes getSellerCalendarReservationList(SellerCalendarReq req) {
        List<SellerReservationListRes.ReservationDTO> res = new ArrayList<>();
        List<Reservation> reservationList = reservationRepository.findReservationsBySellerIdxAndReservationTimeBetween(req.getSellerIdx(), req.getDay(), req.getDay().plusDays(1));
        for (Reservation reservation : reservationList) {
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
                    reservation.getReservationPrice(),
                    pictureDTOS,
                    reservation.getReservationState(),
                    reservation.getReservationType()
            );
            res.add(reservationDTO);
        }
        SellerReservationListRes response = SellerReservationListRes.of(200, "Success", res);
        return response;
    }

    public void reservationState4ListMethod(List<Reservation> reservationList) {
        LocalDateTime currentTime = LocalDateTime.now();
        for (Reservation reservation : reservationList) {
            // 상담 시간 지났으면 종료로 보냄
            if (!reservation.getReservationTime().plusMinutes(15).isAfter(currentTime)) {
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
                        reservation.getReservationPrice(),
                        pictureDTOS,
                        reservation.getReservationState(),
                        reservation.getReservationType()
                );
                proceedingList.add(reservationDTO);
            }
        }
    }
    public void reservationState1ListMethod(List<Reservation> reservationList) {
        LocalDateTime currentTime = LocalDateTime.now();
        for (Reservation reservation : reservationList) {
            // true면 아직 시간 안지남 false면 시간지남 => 상태 업데이트 해줘야함
            // 시간 안지남
            if (reservation.getCreatedAt().plusMinutes(5).isAfter(currentTime)) {
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
                        reservation.getReservationPrice(),
                        pictureDTOS,
                        reservation.getReservationState(),
                        reservation.getReservationType()
                );
                waitingList.add(reservationDTO);
            }
            // 시간 지남 상태 업데이트
            else {
                reservation.updateReservationState("3");
                reservationRepository.save(reservation);
            }
        }
    }
    public void reservationState2ListMethod(List<Reservation> reservationList) {
        LocalDateTime currentTime = LocalDateTime.now();
        for (Reservation reservation : reservationList) {
            // 둘 다 안들어갔는데 에약 시간 만료 시 (15분 지남) 예약 취소
            if (!reservation.getReservationTime().plusMinutes(15).isAfter(currentTime)) {
                reservation.updateReservationState("3");
                reservationRepository.save(reservation);
                continue;
            }
            // 시간 지났음 => 추가 상태 변경하고 똑같은 로직으로 처리
            else if (!reservation.getReservationTime().isAfter(currentTime)) {
                reservation.updateReservationState("4");
                reservationRepository.save(reservation);
                continue;
            }
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
                                picture.getIdx(), picture.getOriginName(), picture.getSaveName());
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
                    reservation.getReservationPrice(),
                    pictureDTOS,
                    reservation.getReservationState(),
                    reservation.getReservationType()
            );
            todayList.add(reservationDTO);
        }
    }
}
