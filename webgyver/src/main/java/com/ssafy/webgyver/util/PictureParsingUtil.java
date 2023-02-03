package com.ssafy.webgyver.util;

import com.ssafy.webgyver.api.request.common.picture.PictureReq;
import com.ssafy.webgyver.db.entity.Article;
import com.ssafy.webgyver.db.entity.Picture;

public class PictureParsingUtil {
    public static Picture parsePictureReqAndArticle2Picture(PictureReq req, Article article) {
        return Picture.builder().article(article).saveName(req.getSaveName()).originName(req.getOriginName()).build();
    }
}
