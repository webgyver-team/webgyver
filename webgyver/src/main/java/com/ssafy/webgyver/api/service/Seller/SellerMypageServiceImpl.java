package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.article.ArticleAllReq;
import com.ssafy.webgyver.api.request.article.ArticleIdxReq;
import com.ssafy.webgyver.api.request.seller.*;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.repository.Seller.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerMypageServiceImpl implements SellerMypageService {
    final ArticleRepository articleRepository;

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
}
