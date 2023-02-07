package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.response.common.category.CategoryListRes;
import com.ssafy.webgyver.db.entity.*;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import com.ssafy.webgyver.db.repository.common.CategoryRepository;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.websocket.dto.RefreshSellerMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommonServiceImpl implements CommonService {
    final CategoryRepository categoryRepository;
    final ReservationRepository reservationRepository;
    final ArticleRepository articleRepository;
    final PictureRepository pictureRepository;

    @Override
    public CategoryListRes getCategoryList() {
        return CategoryListRes.of(200, "Success", categoryRepository.findAll());
    }

    @Override
    public void insertReservationArticlePictureList(long customerIdx, long sellerIdx, RefreshSellerMessage reservationInfo) {
        Reservation reservation = new Reservation();
        Customer customer = Customer.builder().build();
        customer.setIdx(customerIdx);
        Seller seller = Seller.builder().build();
        seller.setIdx(sellerIdx);
        Category category = Category.builder().idx(reservationInfo.getCategoryIdx()).build();

        reservation.setCustomer(customer);
        reservation.setCustomerAddress(reservationInfo.getAddress());
        reservation.setCustomerDetailAddress(reservationInfo.getDetailAddress());

        reservation.setSeller(seller);
        reservation.setCategory(category);
        reservation.setReservationPrice(reservationInfo.getPrice());
        reservation.setReservationTime(LocalDateTime.now());
        reservation.setReservationType("1");

        reservationRepository.save(reservation);

        Article article = null;
        try {

            article = Article.builder()
                    .reservation(reservation)
                    .title(reservationInfo.getTitle())
                    .content(reservationInfo.getContent())
                    .type(-1L)
                    .build();
        } catch (Exception e) {
            System.out.println("객체생성할때오류");
        }
        System.out.println("--------------------------");
        try {
            System.out.println(reservation.getIdx());
            System.out.println(article.getReservation().getIdx());
            System.out.println(article.getReservation().getReservationPrice());
        } catch (Exception e) {
            System.out.println("아티클의 예약정보 가져올때 오류");
        }
        System.out.println("--------------------------");
        try {
            System.out.println(article.getType());
            System.out.println(article.getTitle());
            System.out.println(article.getContent());
        } catch (Exception e) {
            System.out.println("아티클의 기본정보 가져올때 오류");
        }

        System.out.println("--------------------------");
        try {
            articleRepository.save(article);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("저장할때 오류...?");
        }
        System.out.println(article.getIdx());
        for (PictureReq image : reservationInfo.getImages()) {
            Picture picture = Picture.builder().originName(image.getOriginName()).saveName(image.getSaveName()).article(article).build();
            pictureRepository.save(picture);
            System.out.println(picture.getIdx());
        }

        // 영속성 문제, SETTER 사용 불가로 일단 못쓰겠음.
//        System.out.println("----------------------------------");
//        System.out.println(reservation);
//        System.out.println(article);
//        System.out.println(pictureList);
//        System.out.println("----------------------------------");
//        reservationRepository.save(reservation);
//
//        articleRepository.save(article);
//        for (Picture picture : pictureList)
//            pictureRepository.save(picture);
    }
}
