package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.request.common.reservation.ReservationAllReq;
import com.ssafy.webgyver.api.request.customer.CustomerIdxReq;
import com.ssafy.webgyver.api.request.customer.CustomerReservationNormalListReq;
import com.ssafy.webgyver.api.response.customer.CustomerAddressRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationEndInfoRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationListRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationNormalListRes;
import com.ssafy.webgyver.api.service.common.SmsService;
import com.ssafy.webgyver.db.entity.*;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.db.repository.customer.CustomerRepository;
import com.ssafy.webgyver.util.CheckUserUtil;
import com.ssafy.webgyver.util.PictureParsingUtil;
import com.ssafy.webgyver.util.ReservationParsingUtil;
import com.ssafy.webgyver.util.TimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
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
    final CustomerRepository customerRepository;
    final SmsService smsService;

    @Override
    @Transactional
    public Reservation save(ReservationAllReq req) {
        // 작업 프로세스
        // 1. Reservation에 먼저 등록
        // 1-1. 등록할때 category + seller + sellerCategory랑 조인해서 가격이랑 카테고리 정보 가져와야함!
        // 2. 등록된 Reservation를 가지고 Article 등록
        // 3. 등록된 Article를 가지고 Picture들 등록.
        // 4. 주소를 소비자 DB에 저장.

        Reservation reservation = ReservationParsingUtil.parseReservationReq2Reservation(req);


        Seller seller = sellerRepository.findSellerByIdx(req.getSellerIdx());

        Category category = Category.builder().idx(req.getCategoryIdx()).build();
        SellerCategory sellerCategory = sellerCategoryRepository.findSellerCategoryBySellerAndCategory(
                seller, category);
        int price = sellerCategory.getPrice();

        reservation.setSeller(seller);
        reservation.setCategory(category);
        reservation.setReservationPrice(price);
        reservation.setReservationType("2");
        reservation.setReservationState("1");
        reservationRepository.save(reservation);

        Article article = Article.builder().reservation(reservation).title(req.getTitle())
                .content(req.getContent()).type(-1L).build();
        articleRepository.save(article);

        for (PictureReq image : req.getImages()) {
            pictureRepository.save(
                    PictureParsingUtil.parsePictureReqAndArticle2Picture(image, article));
        }

        StringBuilder sb = new StringBuilder();
        String[] smsDate = reservation.getReservationTime().toString().split("T");
        sb.append("[Webgyver]").append('\n')
                .append(smsDate[0]).append(' ').append(smsDate[1]).append("에").append('\n')
                .append("예약 상담 [").append(article.getTitle()).append("]이(가) 접수되었습니다.").append('\n')
                .append("예약 내용을 확인 후 수락해 주세요.");

        smsService.onSendMessage(reservation.getSeller().getPhoneNumber(), sb.toString());

        Customer customer = customerRepository.findByIdx(req.getCustomerIdx()).get();
        customer.setAddress(req.getAddress());
        customer.setDetailAddress(req.getDetailAddress());
        customer.setLat(req.getLat());
        customer.setLng(req.getLng());
        customerRepository.save(customer);

        return reservation;

    }

    // 예약 가능한 모든 상점리스트를 정렬해서 리턴함.
    public CustomerReservationNormalListRes getOrderedStoreList(String order, CustomerReservationNormalListReq req) {
        List<SellerCategory> sellerCategoryList = sellerCategoryRepository.findSellerCategoriesByCategory(Category.builder().idx(req.getCategoryIdx()).build());
        if (sellerCategoryList.size() == 0) {
            return CustomerReservationNormalListRes.of(200, "noData");
        }

        List<Seller> sellerList = sellerCategoryList.stream().map(SellerCategory::getSeller).filter(seller -> seller.getBookTime() != null).collect(Collectors.toList());
        List<Integer> sellerCategoryPrice = sellerCategoryList.stream().map(SellerCategory::getPrice).collect(Collectors.toList());
        LocalDateTime start = TimeUtil.string2Time(req.getDate());
        LocalDateTime end = start.plusDays(1).minusMinutes(1);
        List<List<String>> existReservationTimeList = new ArrayList<>();
        for (Seller seller : sellerList) {
            List<Reservation> reservationList = reservationRepository.findReservationsBySellerAndReservationTimeBetween(
                    seller, start, end).stream().filter(reservation -> (Arrays.asList(new String[]{"2", "4", "5", "6"}).contains(reservation.getReservationState()))).collect(Collectors.toList());
            List<String> existReservationTime = new ArrayList<>();
            for (Reservation reservation : reservationList) {
                existReservationTime.add(
                        TimeUtil.time2String(reservation.getReservationTime(), "HH:mm"));
            }
            existReservationTimeList.add(existReservationTime);
        }

        return CustomerReservationNormalListRes.of(200, "success", sellerList, req,
                existReservationTimeList, sellerCategoryPrice, order);
    }

    // 리턴할 값
    static List<CustomerReservationListRes.ReservationDTO> reservationDTOList;

    // 고객 진행중 예약 리스트 조회 기능
    @Override
    @Transactional
    public CustomerReservationListRes getCustomerReservationList(CustomerIdxReq req) {
        reservationDTOList = new ArrayList<>();
        Customer customer = customerRepository.findByIdx(req.getCustomerIdx()).get();
        // 입력한 IDX 값과 토큰 정보 확인
        if(!CheckUserUtil.check(customer.getId())){
            return CustomerReservationListRes.of(403, "Forbidden", null);
        }
        // 1. 예약 상태 4 => 최상단 띄우기
        List<Reservation> reservationList = reservationRepository.findReservationsByCustomerIdxAndReservationStateOrderByReservationTimeDesc(
                req.getCustomerIdx(), "4");
        reservationState4ListMethod(reservationList);
        // 2. 예약 상태 1 => 수락 대기 중 => 5분 지났으면 상태를 3번으로 변경하고 리턴할 리스트엔 추가하지 않음
        reservationList = reservationRepository.findReservationsByCustomerIdxAndReservationStateOrderByReservationTimeDesc(
                req.getCustomerIdx(), "1");
        reservationState1ListMethod(reservationList);
        // 3. 예약 상태 2 => 예약 확정 => 아직 예약시간이 안됨
        // 4. 예약 상태 2 => 예약 확정 => 예약시간이 됨 => 상태 6으로 변경, 디비 저장 리턴 값 추가
        reservationList = reservationRepository.findReservationsByCustomerIdxAndReservationStateOrderByReservationTimeDesc(
                req.getCustomerIdx(), "2");
        reservationState2ListMethod(reservationList);
        CustomerReservationListRes res = CustomerReservationListRes.of(200, "Success",
                reservationDTOList);
        return res;
    }

    // 고객 완료된 예약 리스트 조회 기능
    @Override
    @Transactional
    public CustomerReservationListRes getCustomerCompletedReservationList(CustomerIdxReq req) {
        reservationDTOList = new ArrayList<>();
        List<Reservation> reservationList = reservationRepository.findReservationsByCustomerIdxAndReservationStateIsInOrderByReservationTimeDesc(
                req.getCustomerIdx(),
                new String[]{"3", "5"});
        reservationListMethod(reservationList);
        CustomerReservationListRes res = CustomerReservationListRes.of(200, "Success",
                reservationDTOList);
        return res;
    }

    @Override
    public CustomerAddressRes getCustomerAddress(CustomerIdxReq req) {
        Customer customer = customerRepository.findByIdx(req.getCustomerIdx()).get();
        CustomerAddressRes res;
        if (customer.getAddress() == null) {
            res = CustomerAddressRes.of(201, "null address", null);
        } else {
            CustomerAddressRes.Response response = new CustomerAddressRes.Response(customer.getAddress(), customer.getDetailAddress(), customer.getLat(), customer.getLng());
            res = CustomerAddressRes.of(200, "have address", response);
        }

        return res;
    }

    public void reservationListMethod(List<Reservation> reservationList) {
        for (Reservation reservation : reservationList) {
            String title = null;    // 예약 제목
            String content = null; // 문의 내용
            List<CustomerReservationListRes.PictureDTO> pictureDTOS = new ArrayList<>();
            // 문의 내용 찾기
            for (Article review : reservation.getArticleList()) {
                if (review.getType() == -1) {
                    title = review.getTitle();
                    content = review.getContent();
                    List<Picture> pictures = pictureRepository.findPicturesByArticleIdx(
                            review.getIdx());
                    // 문의 내용에대한 사진 가져오기
                    for (Picture picture : pictures) {
                        CustomerReservationListRes.PictureDTO pictureTemp = new CustomerReservationListRes.PictureDTO(
                                picture.getIdx(), picture.getOriginName(),
                                picture.getSaveName());
                        pictureDTOS.add(pictureTemp);
                    }
                    break;
                }
            }
            CustomerReservationListRes.ReservationDTO reservationDTO = new CustomerReservationListRes.ReservationDTO(
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
            reservationDTOList.add(reservationDTO);
        }
    }

    public void reservationState4ListMethod(List<Reservation> reservationList) {
        LocalDateTime currentTime = LocalDateTime.now();
        for (Reservation reservation : reservationList) {
            if (!reservation.getReservationTime().plusMinutes(15).isAfter(currentTime)) {
                reservation.updateReservationState("5");
                reservationRepository.save(reservation);
            } else {
                String title = null;    // 예약 제목
                String content = null; // 문의 내용
                List<CustomerReservationListRes.PictureDTO> pictureDTOS = new ArrayList<>();
                // 문의 내용 찾기
                for (Article review : reservation.getArticleList()) {
                    if (review.getType() == -1) {
                        title = review.getTitle();
                        content = review.getContent();
                        List<Picture> pictures = pictureRepository.findPicturesByArticleIdx(
                                review.getIdx());
                        // 문의 내용에대한 사진 가져오기
                        for (Picture picture : pictures) {
                            CustomerReservationListRes.PictureDTO pictureTemp = new CustomerReservationListRes.PictureDTO(
                                    picture.getIdx(), picture.getOriginName(),
                                    picture.getSaveName());
                            pictureDTOS.add(pictureTemp);
                        }
                        break;
                    }
                }
                CustomerReservationListRes.ReservationDTO reservationDTO = new CustomerReservationListRes.ReservationDTO(
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
                reservationDTOList.add(reservationDTO);
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
                List<CustomerReservationListRes.PictureDTO> pictureDTOS = new ArrayList<>();
                // 문의 내용 찾기
                for (Article review : reservation.getArticleList()) {
                    if (review.getType() == -1) {
                        title = review.getTitle();
                        content = review.getContent();
                        List<Picture> pictures = pictureRepository.findPicturesByArticleIdx(
                                review.getIdx());
                        // 문의 내용에대한 사진 가져오기
                        for (Picture picture : pictures) {
                            CustomerReservationListRes.PictureDTO pictureTemp = new CustomerReservationListRes.PictureDTO(
                                    picture.getIdx(), picture.getOriginName(),
                                    picture.getSaveName());
                            pictureDTOS.add(pictureTemp);
                        }
                        break;
                    }
                }
                CustomerReservationListRes.ReservationDTO reservationDTO = new CustomerReservationListRes.ReservationDTO(
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
                reservationDTOList.add(reservationDTO);
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
            boolean addFirst = false;
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
                addFirst = true;
            }
            String title = null;    // 예약 제목
            String content = null; // 문의 내용
            List<CustomerReservationListRes.PictureDTO> pictureDTOS = new ArrayList<>();
            // 문의 내용 찾기
            for (Article review : reservation.getArticleList()) {
                if (review.getType() == -1) {
                    title = review.getTitle();
                    content = review.getContent();
                    List<Picture> pictures = pictureRepository.findPicturesByArticleIdx(
                            review.getIdx());
                    // 문의 내용에대한 사진 가져오기
                    for (Picture picture : pictures) {
                        CustomerReservationListRes.PictureDTO pictureTemp = new CustomerReservationListRes.PictureDTO(
                                picture.getIdx(), picture.getOriginName(), picture.getSaveName());
                        pictureDTOS.add(pictureTemp);
                    }
                    break;
                }
            }
            CustomerReservationListRes.ReservationDTO reservationDTO = new CustomerReservationListRes.ReservationDTO(
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
            if (addFirst) {
                reservationDTOList.add(0, reservationDTO);
            } else {
                reservationDTOList.add(reservationDTO);
            }
        }
    }

    public CustomerReservationEndInfoRes getReservationEndInfo(long reservationIdx) {
        Reservation reservation = reservationRepository.findById(reservationIdx).get();
        if (reservation == null) {
            return CustomerReservationEndInfoRes.of(403, "NoReservation");
        }

        Article article = articleRepository.findArticleByReservationIdxAndType(reservation.getIdx(), -1);

        Map<String, Object> response = new HashMap<>();
        response.put("sellerName", reservation.getSeller().getName());
        response.put("companyName", reservation.getSeller().getCompanyName());
        response.put("title", article.getTitle());
        response.put("price", reservation.getReservationPrice());

        return CustomerReservationEndInfoRes.of(200, "Success", response);
    }
}
