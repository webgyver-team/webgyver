package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.request.common.reservation.ReservationAllReq;
import com.ssafy.webgyver.api.request.customer.CustomerIdxReq;
import com.ssafy.webgyver.api.request.customer.CustomerReservationNormalListReq;
import com.ssafy.webgyver.api.response.customer.CustomerReservationListRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationNormalListRes;
import com.ssafy.webgyver.db.entity.*;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.util.PictureParsingUtil;
import com.ssafy.webgyver.util.ReservationParsingUtil;
import com.ssafy.webgyver.util.TimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerReservationServiceImpl implements CustomerReservationService {

    final ReservationRepository reservationRepository;
    final ArticleRepository articleRepository;
    final PictureRepository pictureRepository;
    final SellerCategoryRepository sellerCategoryRepository;
    final SellerRepository sellerRepository;

    @Override
    @Transactional
    public Reservation save(ReservationAllReq req) {
        // 작업 프로세스
        // 1. Reservation에 먼저 등록
        // 1-1. 등록할때 category + seller + sellerCategory랑 조인해서 가격이랑 카테고리 정보 가져와야함!
        // 2. 등록된 Reservation를 가지고 Article 등록
        // 3. 등록된 Article를 가지고 Picture들 등록.

        Reservation reservation = ReservationParsingUtil.parseReservationReq2Reservation(req);

        Seller seller = Seller.builder().build();
        seller.setIdx(req.getSellerIdx());
        Category category = Category.builder().idx(req.getCategoryIdx()).build();
        SellerCategory sellerCategory = sellerCategoryRepository.findSellerCategoryBySellerAndCategory(seller, category);
        int price = sellerCategory.getPrice();

        reservation.setSeller(seller);
        reservation.setCategory(category);
        reservation.setReservationPrice(price);
        reservationRepository.save(reservation);

        Article article = Article.builder().reservation(reservation).title(req.getTitle()).content(req.getContent()).type(-1L).build();
        articleRepository.save(article);

        for (PictureReq image : req.getImages()) {
            pictureRepository.save(PictureParsingUtil.parsePictureReqAndArticle2Picture(image, article));
        }
        return reservation;
//        req.getImages().stream().map(image -> pictureRepository.save(PictureParsingUtil.parsePictureReqAndArticle2Picture(image, article)));

    }

    // 예약 가능한 모든 상점리스트를 정렬해서 리턴함.
    public CustomerReservationNormalListRes getOrderedStoreList(String order, CustomerReservationNormalListReq req) {
        List<SellerCategory> sellerCategoryList = sellerCategoryRepository.findSellerCategoriesByCategory(Category.builder().idx(req.getCategoryIdx()).build());
        List<Seller> sellerList = sellerCategoryList.stream().map(SellerCategory::getSeller).collect(Collectors.toList());
        List<Integer> sellerCategoryPrice = sellerCategoryList.stream().map(SellerCategory::getPrice).collect(Collectors.toList());
        LocalDateTime start = TimeUtil.string2Time(req.getDate());
        LocalDateTime end = start.plusDays(1).minusMinutes(1);
        List<List<String>> existReservationTimeList = new ArrayList<>();
        for (Seller seller : sellerList) {
            List<Reservation> reservationList = reservationRepository.findReservationsBySellerAndReservationTimeBetween(seller, start, end);
            List<String> existReservationTime = new ArrayList<>();
            for (Reservation reservation : reservationList) {
                existReservationTime.add(TimeUtil.time2String(reservation.getReservationTime(), "HHmm"));
            }
            existReservationTimeList.add(existReservationTime);
        }

        return CustomerReservationNormalListRes.of(200, "success", sellerList, req, existReservationTimeList, sellerCategoryPrice, order);
    }

    @Override
    public CustomerReservationListRes getCustomerReservationList(CustomerIdxReq req) {
        List<Reservation> reservationList = reservationRepository.findReservationsByCustomerIdxOrderByIdxDesc(req.getCustomerIdx());
        log.info("{} : ", reservationList);
        List<CustomerReservationListRes.ReservationDTO> reservationDTOList = new ArrayList<>();
        for (Reservation reservation : reservationList) {
            // 예약 상태가 아직 진행되지 않은 상태
            if (reservation.getReservationState().equals("1") || reservation.getReservationState().equals("2") || reservation.getReservationState().equals("4")) {
                String title = null;    // 예약 제목
                String content = null; // 문의 내용
                List<CustomerReservationListRes.PictureDTO> pictureDTOS = new ArrayList<>();
                // 문의 내용 찾기
                for (Article review : reservation.getArticleList()) {
                    if (review.getType() == -1) {
                        title = review.getTitle();
                        content = review.getContent();
                        List<Picture> pictures = pictureRepository.findPicturesByArticleIdx(review.getIdx());
                        // 문의 내용에대한 사진 가져오기
                        for (Picture picture : pictures) {
                            CustomerReservationListRes.PictureDTO pictureTemp = new CustomerReservationListRes.PictureDTO(picture.getIdx(), picture.getOriginName(), picture.getSaveName());
                            pictureDTOS.add(pictureTemp);
                        }
                    }
                }
                CustomerReservationListRes.ReservationDTO reservationDTO = new CustomerReservationListRes.ReservationDTO(
                        reservation.getIdx(),
                        title,
                        reservation.getReservationTime(),
                        content,
                        reservation.getSeller().getCompanyName(),
                        pictureDTOS,
                        reservation.getReservationState()
                );
                // 예약 상태가 현재 상담 진행중이면 제일 위로해서 보내주기 위해 0번 엔덱스에 추가
                if (reservation.getReservationState().equals("4")){
                    reservationDTOList.add(0,reservationDTO);
                }else {
                    reservationDTOList.add(reservationDTO);
                }
            }
        }

        return null;
    }
}
