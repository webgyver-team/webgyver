package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Seller.*;
import com.ssafy.webgyver.api.response.Seller.SellerMypageHistoryRes;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import com.ssafy.webgyver.db.repository.Seller.CategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerMypageServiceImpl implements SellerMypageService {
    final ArticleRepository articleRepository;

    @Override
    public List<Article> getAllHistory(SellerMypageHistoryReq req) {
        return articleRepository.findArticlesByType(Long.parseLong(req.getSellerIdx()));
    }

    @Override
    public Article insertHistory(SellerMypageHistoryPostReq req) {
        Article article = Article.builder().title(req.getTitle())
                .content(req.getContent())
                .type(req.getType())
                .build();
        return articleRepository.save(article);
    }

    @Override
    public Article updateHistory(SellerMypageHistoryPutReq req) {
        Article article = Article.builder().idx(req.getIdx())
                .title(req.getTitle())
                .content(req.getContent())
                .type(req.getType())
                .build();
        return articleRepository.save(article);
    }
}
