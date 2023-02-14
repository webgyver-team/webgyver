package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.request.customer.CustomerModifyReviewReq;
import com.ssafy.webgyver.api.request.customer.CustomerMypageReq;
import com.ssafy.webgyver.api.request.customer.CustomerRegisterReviewReq;
import com.ssafy.webgyver.api.response.article.CustomerReviewListRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.*;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.db.repository.customer.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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
    final PasswordEncoder passwordEncoder;
    final SellerRepository sellerRepository;

    @Value("${properties.file.toss.secret}")
    String tossKey;

    /**
     * 사용자 profile 조회
     * @param idx 사용자 구분 idx
     * @return customer - 사용자 정보
     */
    @Override
    public Customer getProfile(Long idx) {
        Optional<Customer> customer = customerRepository.findByIdx(idx);

        return customer.orElse(null);
    }

    /**
     * 사용자 profile 수정
     * @param req 수정할 profile 정보
     * @return 수정 여부
     */
    @Transactional
    @Override
    public BaseResponseBody setProfile(CustomerMypageReq req) {
        Customer customer = customerRepository.findByIdx(req.getIdx()).get();

        //카드 등록
        if(isCheck(req.getCardNumber())) {
            String customerKey = new String(Base64.getEncoder().encode((customer.getId() + req.getCardNumber()).getBytes()));
            BaseResponseBody resultBilling = registerCard(customerKey, req);

            if(resultBilling.getStatusCode() != 200)
                return resultBilling;

            customer.setBillingKey(resultBilling.getMessage());
            customer.setCustomerKey(customerKey);
        }

        if(isCheck(req.getName()))
            customer.setName(req.getName());

        if(isCheck(req.getPhoneNumber()))
            customer.setPhoneNumber(req.getPhoneNumber());

        if(isCheck(req.getBirthDay())) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            customer.setBirthDay(LocalDate.parse(req.getBirthDay().substring(0, 8), formatter));
            customer.setGender(req.getBirthDay().substring(8));
        }

        if(isCheck(req.getCardNumber()))
            customer.setCardNumber(req.getCardNumber());

        if(isCheck(req.getCardValidity())) {
            customer.setCardValidity(req.getCardValidity());
        }

        if(isCheck(req.getPassword())) {
            customer.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        return BaseResponseBody.of(200, "Success");
    }

    /**
     * 수정할 요소 유효성 검사
     * @param check 검사할 요소
     * @return boolean
     */
    private boolean isCheck(String check) {
        return check != null && !check.isEmpty();
    }

    /**
     * 카드 등록
     * @param customerKey 사용자 구분을 위한 key
     * @param req 카드 정보
     * @return 등록 여부
     */
    private BaseResponseBody registerCard(String customerKey, CustomerMypageReq req) {
        try {
            URL url = new URL("https://api.tosspayments.com/v1/billing/authorizations/card");

            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", tossKey);
            connection.setDoOutput(true);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("cardNumber", req.getCardNumber());
            jsonObject.put("cardExpirationYear", req.getCardValidity().substring(2, 4));
            jsonObject.put("cardExpirationMonth", req.getCardValidity().substring(0, 2));
            jsonObject.put("customerIdentityNumber", req.getBirthDay().substring(2, 8));
            jsonObject.put("customerKey", customerKey); //고객 ID, 무작위값 설정하여 사용

            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.writeBytes(jsonObject.toString());
            outputStream.flush();
            outputStream.close();

            int respCode = connection.getResponseCode(); // New items get NOT_FOUND on PUT

            if (respCode == HttpURLConnection.HTTP_OK) {
                // Read input data stream.
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                JSONParser parser = new JSONParser();
                JSONObject resObject = (JSONObject) parser.parse(reader.readLine());

                reader.close();

                return BaseResponseBody.of(200, resObject.get("billingKey").toString());

            } else {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                JSONParser parser = new JSONParser();
                JSONObject resObject = (JSONObject) parser.parse(reader.readLine());

                return BaseResponseBody.of(204, resObject.get("message").toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponseBody.of(500, "Fail");
        }
    }

    /**
     * 사용자 리뷰 조회
     * @param req 사용자 정보
     * @return 리뷰 목록
     */
    @Override
    public List<Map<String, Object>> getReviewList(CustomerMypageReq req) {
        List<Reservation> reservationList = reservationRepository.findReservationsByCustomerIdx(req.getIdx());

        List<Map<String, Object>> reviews = new ArrayList<>();
        for(Reservation reservation : reservationList) {
            Map<String, Object> review = new HashMap<>();
            Article article = articleRepository.findArticleByReservationIdxAndTypeLessThan(reservation.getIdx(), -2);

            if(article != null) {
                review.put("review", article);
                Object images = pictureRepository.findPicturesByArticleIdx(article.getIdx());

                if(images != null)
                    review.put("images", images);

                reviews.add(review);
            }
        }

        return reviews;
    }

    /**
     * 사용자 리뷰 상세 조회
     * @param reviewIdx 리뷰 idx
     * @return 상세 조회 결과
     */
    @Override
    public BaseResponseBody getDetailReview(Long reviewIdx) {
        Map<String, Object> review = new HashMap<>();
        Article article = articleRepository.findByIdx(reviewIdx);

        if(article != null) {
            review.put("review", article);
            List<Picture> pictures = pictureRepository.findPicturesByArticleIdx(reviewIdx);

            if(pictures != null)
                review.put("images", pictures);

            return CustomerReviewListRes.getDetailCustomerArticle(200, "OK", review);
        }

        return BaseResponseBody.of(500, "목록을 가져올 수 없습니다. 잠시 후 다시 시도해 주세요.");
    }

    /**
     * 사용자 리뷰 등록
     * @param req 등록할 리뷰 정보
     * @return 등록 여부
     */
    @Override
    @Transactional
    public BaseResponseBody regiterReview(CustomerRegisterReviewReq req) {
        Reservation reservation = reservationRepository.findByIdx(req.getReservationIdx());

        long type = (req.getRating() * -1L) - 2; //별점
        Article review = Article.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .reservation(reservation)
                .type(type).build();

        Article article = articleRepository.save(review);

        savePictures(req.getImages(), article);

        Seller seller = reservation.getSeller();
        seller.addReview(req.getRating());

        sellerRepository.save(seller);

        return BaseResponseBody.of(200, "Success");
    }

    /**
     * 사용자 리뷰 수정
     * @param req 수정할 리뷰 정보
     * @return 수정 여부
     */
    @Transactional
    @Override
    public BaseResponseBody modifyReview(CustomerModifyReviewReq req) {
        Article article = articleRepository.findByIdx(req.getReviewIdx());
        pictureRepository.deletePictureByArticle(article);

        if(isCheck(req.getTitle()))
            article.setTitle(req.getTitle());

        if(isCheck(req.getContent()))
            article.setContent(req.getContent());

        if(req.getRating() != null) {
            long beforeStar = (article.getType() * -1L) - 2;
            long afterType = (req.getRating() * -1L) - 2;
            article.setType(afterType);

            Seller seller = article.getReservation().getSeller();
            seller.updateReview(beforeStar, req.getRating());

            sellerRepository.save(seller);
        }

        savePictures(req.getImages(), article);

        return BaseResponseBody.of(200, "Success");
    }

    /**
     * 사용자 리뷰 삭제
     * @param reviewIdx 리뷰 idx
     * @return 삭제 여부
     */
    @Transactional
    @Override
    public BaseResponseBody deleteReview(Long reviewIdx) {
        Article article = articleRepository.findByIdx(reviewIdx);

        long star = (article.getType() * -1L) - 2; //별점
        Seller seller = article.getReservation().getSeller();
        seller.deleteReview(star);

        pictureRepository.deletePictureByArticle(article);
        articleRepository.delete(article);
        sellerRepository.save(seller);

        return BaseResponseBody.of(200, "OK");
    }

    /**
     * 이미지 저장
     * @param pictureList 저장할 이미지 리스트
     * @param article 이미지가 참조할 Article
     */
    private void savePictures(List<PictureReq> pictureList, Article article) {
        List<Picture> pictures = new ArrayList<>();
        for (PictureReq pictureReq : pictureList) {
            Picture picture = Picture.builder()
                    .article(article)
                    .originName(pictureReq.getOriginName())
                    .saveName(pictureReq.getSaveName())
                    .build();

            pictures.add(picture);
        }

        pictureRepository.saveAll(pictures);
    }
}

