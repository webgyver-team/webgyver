package com.ssafy.webgyver.api.response.seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Seller;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SellerMyPageIntroRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    static class Response {
        private Long idx;
        private String userName;
        private String companyName;
        private String partnerName;
        private String phoneNumber;
        private String address;
        private String detailAddress;
        private String companyNumber;
        private String companyDescription;
        private List<CompanyTimeDTO> companyTime;
        private List<CategoryDTO> categoryList;
        private String profileImage;
        private String backgroundImage;
        private String ratingAvg;
        private String reviewCnt;
        public Response(Seller entity, List<CompanyTimeDTO> companyTimeDTOList, List<CategoryDTO> categoryDTOList){
            this.idx = entity.getIdx();
            this.userName = entity.getName();
            this.companyName = entity.getCompanyName();
            this.partnerName = entity.getRepresentativeName();
            this.phoneNumber = entity.getPhoneNumber();
            this.address = entity.getAddress();
            this.detailAddress = entity.getDetailAddress();
            this.companyNumber = entity.getCompanyNumber();
            this.companyDescription = entity.getCompanyDescription();
            this.companyTime = companyTimeDTOList;
            this.categoryList = categoryDTOList;
            this.profileImage = entity.getProfileImage();
            this.backgroundImage = entity.getCompanyImage();
            this.ratingAvg = String.valueOf(Math.round(((double) entity.getStarTotal() / entity.getReviewCount()) * 100.0) / 100.0);
            this.reviewCnt = String.valueOf(entity.getReviewCount());
        }
    }
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Category{
        private Long idx;
        private String categoryName;
    }
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryDTO{
        private Category category;
        private Integer price;

    }
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompanyTimeDTO{
        private String day;
        private String open;
        private String close;
        private boolean isHoliday;

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
