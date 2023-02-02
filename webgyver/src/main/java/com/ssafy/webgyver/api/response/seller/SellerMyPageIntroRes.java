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
        private String companyNumber;
        private String companyDescription;
        private List<CompanyTimeDTO> companyTime;
        private List<CategoryDTO> category;
        private String profileImage;
        private String backgroundImage;
        private String ratingAvg;
        private String reviewCnt;
        public Response(Seller entity, List<CompanyTimeDTO> companyTimeDTOList, List<CategoryDTO> categoryDTOList, String ratingAvg, String reviewCnt){
            this.idx = entity.getIdx();
            this.storeName = entity.getCompanyName();
            this.partnerName = entity.getName();
            this.address = entity.getAddress();
            this.companyNumber = entity.getCompanyNumber();
            this.companyDescription = entity.getCompanyDescription();
            this.companyTime = companyTimeDTOList;
            this.category = categoryDTOList;
            this.profileImage = entity.getProfileImage();
            this.backgroundImage = entity.getCompanyImage();
            this.ratingAvg = ratingAvg;
            this.reviewCnt = reviewCnt;
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

    public static SellerMyPageIntroRes of(Integer statusCode, String message, Seller seller, List<CompanyTimeDTO> companyTimeList, List<CategoryDTO> categoryDTOList, String ratingAvg, String reviewCnt) {
        SellerMyPageIntroRes res = new SellerMyPageIntroRes();
        Response response = new Response(seller, companyTimeList, categoryDTOList, ratingAvg, reviewCnt);
//        List<CategoryDTO> categoryList = seller.getSellerCategories().stream().map(CategoryDTO::new).collect(Collectors.toList());
//        CategoryRes res = new CategoryRes();
//        res.getData().put("category", new CategoryRes.SimpleCategory(category));
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.getData().put("profile", response);
        return res;
    }
}
