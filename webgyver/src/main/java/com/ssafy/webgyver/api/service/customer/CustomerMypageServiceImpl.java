package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.customer.CustomerMypageReq;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.db.repository.customer.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerMypageServiceImpl implements CustomerMypageService {
    final CustomerRepository customerRepository;
    final ArticleRepository articleRepository;
    final ReservationRepository reservationRepository;
    final PictureRepository pictureRepository;

    @Override
    public Customer getProfile(Long idx) {
        Optional<Customer> customer = customerRepository.findByIdx(idx);

        return customer.orElse(null);
    }

    @Transactional
    @Override
    public Customer setProfile(CustomerMypageReq req) {
        Customer customer = customerRepository.findByIdx(req.getIdx()).get();
        customer.setName(req.getName());
        customer.setPhoneNumber(req.getPhoneNumber());
        customer.setCardNumber(req.getCardNumber());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        customer.setBirthDay(LocalDate.parse(req.getBirth(), formatter).atStartOfDay());

        return customer;
    }

    @Override
    public List<Map<String, Object>> getReviewList(CustomerMypageReq req) {
        List<Reservation> reservationList = reservationRepository.findReservationsByCustomerIdx(req.getIdx());

        List<Map<String, Object>> reviews = new ArrayList<>();
        for(Reservation reservation : reservationList) {
            Map<String, Object> review = new HashMap<>();
            Article article = articleRepository.findArticleByReservationIdxAndTypeLessThan(reservation.getIdx(), -2);
            review.put("review", article);
            review.put("images", pictureRepository.findPicturesByArticleIdx(article.getIdx()));

            reviews.add(review);
        }

        return reviews;
    }
}
