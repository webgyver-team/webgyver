package com.ssafy.webgyver.db.repository.common;

import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PictureRepository extends JpaRepository<Picture, Long> {
    List<Picture> findPicturesByArticleIdx(Long idx);
    void deletePictureByArticle(Article article);
}
