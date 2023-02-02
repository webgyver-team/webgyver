package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.request.common.reservation.ReservationAllReq;
import com.ssafy.webgyver.db.entity.*;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.util.PictureParsingUtil;
import com.ssafy.webgyver.util.ReservationParsingUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Log
@Service
@RequiredArgsConstructor
public class CustomerReservationServiceImpl implements CustomerReservationService {

    final ReservationRepository reservationRepository;
    final ArticleRepository articleRepository;
    final PictureRepository pictureRepository;
    final SellerCategoryRepository sellerCategoryRepository;

    @Override
    @Transactional
    public void save(ReservationAllReq req) {
        // 작업 프로세스
        // 1. Reservation에 먼저 등록
        // 1-1. 등록할때 category + seller + sellerCategory랑 조인해서 가격이랑 카테고리 정보 가져와야함!
        // 2. 등록된 Reservation를 가지고 Article 등록
        // 3. 등록된 Article를 가지고 Picture들 등록.

        Reservation reservation = ReservationParsingUtil.parseReservationReq2Reservation(req);
        System.out.println(reservation);

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
//        req.getImages().stream().map(image -> pictureRepository.save(PictureParsingUtil.parsePictureReqAndArticle2Picture(image, article)));

    }
}
