package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.api.response.common.category.CategoryListRes;
import com.ssafy.webgyver.websocket.dto.RefreshSellerMessage;

public interface CommonService {
    CategoryListRes getCategoryList();

    void insertReservationArticlePictureList(long customerIdx, long sellerIdx, RefreshSellerMessage reservationInfo);
}
