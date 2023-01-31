package com.ssafy.webgyver.db.repository.Seller;

import com.ssafy.webgyver.db.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findArticlesByType(long sellerIdx);
    Article findArticleByReservationIdxAndTypeLessThan(long idx, long type);
}
