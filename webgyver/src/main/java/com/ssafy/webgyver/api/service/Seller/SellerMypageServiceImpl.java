package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.article.ArticleAllReq;
import com.ssafy.webgyver.api.request.article.ArticleIdxReq;
import com.ssafy.webgyver.api.request.common.picture.PictureListReq;
import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.api.request.seller.*;
import com.ssafy.webgyver.api.response.article.HistoryListRes;
import com.ssafy.webgyver.api.response.seller.SellerMyPageIntroRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.*;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import com.ssafy.webgyver.db.repository.common.PictureRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import com.ssafy.webgyver.util.PictureParsingUtil;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerMypageServiceImpl implements SellerMypageService {
    final ArticleRepository articleRepository;
    final SellerRepository sellerRepository;
    final SellerCategoryRepository sellerCategoryRepository;
    final PictureRepository pictureRepository;
    final ReservationRepository reservationRepository;
    final PasswordEncoder passwordEncoder;

    @Override
    public List<Article> getAllHistory(SellerIdxReq req) {
        return articleRepository.findArticlesByType(req.getSellerIdx());
    }

    public Map<Long, List<Picture>> getAllPictureMap(List<Article> articleList) {
        Map<Long, List<Picture>> pictureListReqMap = new HashMap<>();
        for (Article article : articleList) {
            pictureListReqMap.put(article.getIdx(), pictureRepository.findPicturesByArticleIdx(article.getIdx()));
        }
        return pictureListReqMap;
    }

    @Override
    public void deleteAllPicture(long articleIdx) {
        pictureRepository.deleteAllByArticleIdx(articleIdx);
    }

    @Override
    public Article insertHistory(ArticleAllReq req) {
        Article article = Article.builder().title(req.getTitle())
                .content(req.getContent())
                .type(req.getType())
                .build();
        return articleRepository.save(article);
    }

    @Override
    public Article updateHistory(ArticleAllReq req) {
        Article article = Article.builder().idx(req.getIdx())
                .title(req.getTitle())
                .content(req.getContent())
                .type(req.getType())
                .build();
        return articleRepository.save(article);
    }

    @Override
    public void insertPictures(Article article, PictureListReq req) {
        for (PictureReq picture : req.getImages()) {
            pictureRepository.save(PictureParsingUtil.parsePictureReqAndArticle2Picture(picture, article));
        }
    }

    @Override
    public void updatePictures(Article article, PictureListReq req) {

    }

    @Override
    public void deleteHistory(ArticleIdxReq req) {

        articleRepository.deleteById(req.getArticleIdx());
    }

    @Override
    public SellerMyPageIntroRes getSellerMyPageIntro(SellerIdxReq req) {
        Seller seller = sellerRepository.findSellerByIdx(req.getSellerIdx());
        ///// 영업시간 구하기
        List<SellerMyPageIntroRes.CompanyTimeDTO> companyTimeDTOList = null;
        String companyTime = seller.getCompanyTime();
        if (companyTime != null) {
            String[] list = companyTime.split("%");
            companyTimeDTOList = new ArrayList<>();
            for (int i = 0; i < list.length; i++){
                boolean isHoliday;
                String open = "";
                String close = "";
                // 공휴일 여부 추가
                if (list[i].substring(4).equals("휴일")){
                    isHoliday = true;
                } else {
                    String[] listTime = list[i].substring(4).split("~");
                    open = listTime[0];
                    close = listTime[1];
                    isHoliday = false;
                }
                companyTimeDTOList.add(new SellerMyPageIntroRes.CompanyTimeDTO(list[i].substring(0,3), open, close, isHoliday));
            }
        }
        ///// 끝
        ///// 카테고리 구하기
        List<SellerCategory> categories = seller.getSellerCategories();
        List<SellerMyPageIntroRes.CategoryDTO> categoryDTOList = new ArrayList<>();
        for (SellerCategory temp : categories) {
            categoryDTOList.add(new SellerMyPageIntroRes.CategoryDTO(new SellerMyPageIntroRes.Category(temp.getCategory().getIdx(), temp.getCategory().getCategoryName()), temp.getPrice()));
        }
        ///// 끝
        SellerMyPageIntroRes result = SellerMyPageIntroRes.of(200, "Success", seller, companyTimeDTOList, categoryDTOList);

        return result;
    }

    @Override
    @Transactional
    public BaseResponseBody updateSellerDescription(SellerIdxReq req, SellerDescriptionUpdateReq description) {
        Seller seller = sellerRepository.findSellerByIdx(req.getSellerIdx());
        seller.updateSellerDescription(description.getCompanyDescription());
        sellerRepository.save(seller);
        BaseResponseBody res = BaseResponseBody.of(200, "Success");
        return res;
    }

    @Override
    public BaseResponseBody updateSellerTime(SellerIdxReq req, SellerTimeUpdateReq timeReq) {
        Seller seller = sellerRepository.findSellerByIdx(req.getSellerIdx());
        String timeString = "";
        for (int i = 0; i < 8; i++){
            if (timeReq.getCompanyTime().get(i).getHoliday()){
                timeString += timeReq.getCompanyTime().get(i).getDay() + "$휴일%";
            } else {
                timeString += timeReq.getCompanyTime().get(i).getDay() + "$"
                        + timeReq.getCompanyTime().get(i).getOpen() + "~" + timeReq.getCompanyTime().get(i).getClose() + "%";
            }
        }
        seller.updateSellerTime(timeString);
        sellerRepository.save(seller);
        BaseResponseBody res = BaseResponseBody.of(200, "Success");
        return res;
    }

    @Override
    @Transactional
    public BaseResponseBody updateSellerProfile(SellerIdxReq req, SellerProfileUpdateReq profileReq) {
        System.out.println(profileReq);
        Seller seller = sellerRepository.findSellerByIdx(req.getSellerIdx());
        seller.updateSellerProfile(profileReq.getProfileImage(), profileReq.getBackgroundImage(),
                passwordEncoder.encode(profileReq.getPassword()), profileReq.getPhoneNumber(), profileReq.getStoreName(),
                profileReq.getAddress(), profileReq.getDetailAddress());
        sellerCategoryRepository.deleteAllInBatch(seller.getSellerCategories());
        for (SellerCategory SC : profileReq.getCategoryList()) {
            SellerCategory sellerCategory = SellerCategory.builder()
                    .category(SC.getCategory())
                    .price(SC.getPrice())
                    .seller(seller)
                    .build();
            sellerCategoryRepository.save(sellerCategory);
        }
        BaseResponseBody res = BaseResponseBody.of(200, "Success");
        return res;
    }


}
