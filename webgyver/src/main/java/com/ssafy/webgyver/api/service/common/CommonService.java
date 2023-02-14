package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.api.response.common.category.CategoryListRes;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.websocket.dto.RefreshSellerMessage;

public interface CommonService {
    CategoryListRes getCategoryList();

    Reservation insertReservationArticlePictureList(long customerIdx, long sellerIdx, RefreshSellerMessage reservationInfo);

    Customer getCustomer(long customerIdx);

    Customer saveCustomer(Customer customer);

    Seller getSeller(long sellerIdx);

    void setSeller(Seller seller);
}
