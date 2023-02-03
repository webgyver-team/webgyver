package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.article.ArticleAllReq;
import com.ssafy.webgyver.api.request.article.ArticleIdxReq;
import com.ssafy.webgyver.api.request.seller.*;
import com.ssafy.webgyver.api.response.seller.SellerMyPageIntroRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import com.ssafy.webgyver.db.repository.common.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerMypageServiceImpl implements SellerMypageService {
    final ArticleRepository articleRepository;
    final SellerRepository sellerRepository;
    final ReservationRepository reservationRepository;
    @Override
    public List<Article> getAllHistory(SellerIdxReq req) {
        return articleRepository.findArticlesByType(req.getSellerIdx());
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
    public void deleteHistory(ArticleIdxReq req) {

        articleRepository.deleteById(req.getArticleIdx());
    }

    @Override
    public SellerMyPageIntroRes getSellerMyPageIntro(SellerIdxReq req) {
        Seller seller = sellerRepository.findSellerByIdx(req.getSellerIdx());
        ///// 영업시간 구하기
        List<SellerMyPageIntroRes.CompanyTimeDTO> companyTimeDTOList = null;
        String companyTime = seller.getCompanyTime();
        if (companyTime != null){
            String[] list = companyTime.split("%");
            companyTimeDTOList = new ArrayList<>();
            for (int i = 0; i < list.length; i++){
                companyTimeDTOList.add(new SellerMyPageIntroRes.CompanyTimeDTO(list[i].substring(0,3), list[i].substring(5)));
            }
        }
        ///// 끝
        ///// 카테고리 구하기
        List<SellerCategory> categories = seller.getSellerCategories();
        List<SellerMyPageIntroRes.CategoryDTO> categoryDTOList = new ArrayList<>();
        for (SellerCategory temp : categories) {
            categoryDTOList.add(new SellerMyPageIntroRes.CategoryDTO(temp.getIdx(), temp.getCategory().getCategoryName(), temp.getPrice()));
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
        BaseResponseBody res = BaseResponseBody.of(200,"Success");
        return res;
    }


}
