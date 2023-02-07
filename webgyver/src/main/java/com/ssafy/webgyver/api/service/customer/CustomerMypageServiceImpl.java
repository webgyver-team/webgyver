package com.ssafy.webgyver.api.service.customer;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.request.customer.CustomerMypageReq;
import com.ssafy.webgyver.api.request.customer.CustomerRegisterReviewReq;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.Picture;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
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

    @Value("${properties.file.toss.secret}")
    String tossKey;

    @Override
    public Customer getProfile(Long idx) {
        Optional<Customer> customer = customerRepository.findByIdx(idx);

        return customer.orElse(null);
    }

    @Transactional
    @Override
    public BaseResponseBody setProfile(CustomerMypageReq req) {
        Customer customer = customerRepository.findByIdx(req.getIdx()).get();

        //카드 등록
        if(isProfileCheck(req.getCardNumber())) {
            String customerKey = new String(Base64.getEncoder().encode((customer.getId() + req.getCardNumber()).getBytes()));
            BaseResponseBody resultBilling = registerCard(customerKey, req);

            if(resultBilling.getStatusCode() != 200)
                return resultBilling;

            customer.setBillingKey(resultBilling.getMessage());
            customer.setCustomerKey(customerKey);
        }

        if(isProfileCheck(req.getName()))
            customer.setName(req.getName());

        if(isProfileCheck(req.getPhoneNumber()))
            customer.setPhoneNumber(req.getPhoneNumber());

        if(isProfileCheck(req.getBirth())) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            customer.setBirthDay(LocalDate.parse(req.getBirth(), formatter).atStartOfDay());
        }

        if(isProfileCheck(req.getCardNumber()))
            customer.setCardNumber(req.getCardNumber());

        if(isProfileCheck(req.getCardValidity())) {
            customer.setCardValidity(req.getCardValidity());
        }

        if(isProfileCheck(req.getPassword())) {
            customer.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        return BaseResponseBody.of(200, "Success");
    }

    private boolean isProfileCheck(String check) {
        return check != null && !check.isEmpty();
    }

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
            jsonObject.put("customerIdentityNumber", req.getBirth().substring(2, 8));
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

    @Override
    @Transactional
    public BaseResponseBody regiterReview(CustomerRegisterReviewReq req) {
        Reservation reservation = Reservation.builder().build();
        reservation.setIdx(req.getReservationIdx());

        long type = (req.getStar() * -1L) - 2;
        Article review = Article.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .reservation(reservation)
                .type(type).build();

        Article article = articleRepository.save(review);

        List<Picture> pictures = new ArrayList<>();
        for (PictureReq pictureReq : req.getPictureListReq().getImages()) {
            Picture picture = Picture.builder()
                    .article(article)
                    .originName(pictureReq.getOriginName())
                    .saveName(pictureReq.getSaveName())
                    .build();

            pictures.add(picture);
        }

        pictureRepository.saveAll(pictures);

        return BaseResponseBody.of(200, "Success");
    }
}

