package com.ssafy.webgyver.api.response.seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Seller;
import lombok.*;

import java.util.List;

@Getter
@Setter
public class SellerMyPageIntroRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Response {
        private Long idx;
        private String storeName;
        private String partnerName;
        private String address;
        private String detailAddress;
        private String companyNumber;
        private String companyDescription;
        private List<CompanyTimeDTO> companyTime;
        private List<CategoryDTO> category;
        private String profileImage;
        private String backgroundImage;
        private String ratingAvg;
        private String reviewCnt;
        public Response(Seller entity, List<CompanyTimeDTO> companyTimeDTOList, List<CategoryDTO> categoryDTOList){
            this.idx = entity.getIdx();
            this.storeName = entity.getCompanyName();
            this.partnerName = entity.getRepresentativeName();
            this.address = entity.getAddress();
            this.detailAddress = entity.getDetailAddress();
            this.companyNumber = entity.getCompanyNumber();
            this.companyDescription = entity.getCompanyDescription();
            this.companyTime = companyTimeDTOList;
            this.category = categoryDTOList;
            this.profileImage = entity.getProfileImage();
            this.backgroundImage = entity.getCompanyImage();
            this.ratingAvg = String.valueOf(Math.round(((double) entity.getStarTotal() / entity.getReviewCount()) * 100.0) / 100.0);
            this.reviewCnt = String.valueOf(entity.getReviewCount());
        }
    }
    @ToString
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryDTO{
        private Long idx;
        private String categoryName;
        private Integer price;

    }
    @ToString
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompanyTimeDTO{
        private String day;
        private String time;


    }

    public static SellerMyPageIntroRes of(Integer statusCode, String message, Seller seller, List<CompanyTimeDTO> companyTimeList, List<CategoryDTO> categoryDTOList) {
        SellerMyPageIntroRes res = new SellerMyPageIntroRes();
        Response response = new Response(seller, companyTimeList, categoryDTOList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("profile", response);
        return res;
    }
}
