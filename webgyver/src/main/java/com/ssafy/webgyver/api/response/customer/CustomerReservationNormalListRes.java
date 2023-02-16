package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.api.request.customer.CustomerReservationNormalListReq;
import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.util.CommonUtil;
import com.ssafy.webgyver.util.TimeUtil;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Getter
@Setter
public class CustomerReservationNormalListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Store {
        private Long sellerIdx;
        private String storeName;
        private String personName;
        private String address;
        private String detailAddress;
        private String distance;
        private double star;
        private List<String> allTime;
        private List<String> noTime;
        private String image;
        private Integer price;

        public Store(Seller seller, List<String> existReservationTime, CustomerReservationNormalListReq req, int price) {
            this.sellerIdx = seller.getIdx();
            this.storeName = seller.getCompanyName();
            this.personName = seller.getName();
            this.address = seller.getAddress();
            this.detailAddress = seller.getDetailAddress();
            this.distance = String.valueOf(CommonUtil.getDistanceWithKM(seller.getLat(), seller.getLng(), req.getLat(), req.getLng()));
            this.star = CommonUtil.getStar(seller.getStarTotal(), seller.getReviewCount());
            this.allTime = TimeUtil.getAllTime(seller.getBookTime(), TimeUtil.string2Time(req.getDate(), "yyyyMMdd"));
            this.noTime = existReservationTime;
            this.image = seller.getProfileImage();
            this.price = price;
        }

    }

    public static CustomerReservationNormalListRes of(Integer statusCode, String message) {

        CustomerReservationNormalListRes res = new CustomerReservationNormalListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("storeList", new ArrayList<>());
        return res;
    }

    public static CustomerReservationNormalListRes of(Integer statusCode, String message, List<Seller> sellerList, CustomerReservationNormalListReq req, List<List<String>> existReservationTimeList, List<Integer> sellerCategoryPrice, String order) {
        CustomerReservationNormalListRes res = new CustomerReservationNormalListRes();
        List<Store> storeList = new ArrayList<>();
        for (int i = 0; i < sellerList.size(); i++) {
            Store store = new Store(sellerList.get(i), existReservationTimeList.get(i), req, sellerCategoryPrice.get(i));
            if (store.allTime == null) continue;
            storeList.add(store);
        }
        Comparator<Store> comparator = null;
        // 1-> 거리순, 2 -> 평점순, 3 -> 가격순
        if (order.equals("2")) {
            comparator = (a, b) -> (Double.compare(Double.parseDouble(a.getDistance()), Double.parseDouble(b.getDistance())));
        } else if (order.equals("1")) {
            comparator = (a, b) -> (Double.compare(b.getStar(), a.getStar()));
        } else {
            comparator = Comparator.comparingInt(Store::getPrice);
        }
        storeList.sort(comparator);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("storeList", storeList);
        return res;
    }
}
