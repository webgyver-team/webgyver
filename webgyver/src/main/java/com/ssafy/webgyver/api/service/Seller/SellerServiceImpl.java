package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.Seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.Seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.Seller.SellerLoginRes;
import com.ssafy.webgyver.common.util.JwtTokenUtil;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.repository.Seller.CategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service("SellerService")
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService{
    final PasswordEncoder passwordEncoder;
    final SellerRepository sellerRepository;
    final SellerCategoryRepository sellerCategoryRepository;
    final CategoryRepository categoryRepository;
    @Transactional
    @Override
    public Seller SignUpSeller(SellerSignUpPostReq sellerRegisterInfo) {
        System.out.println("서비스 들어왔엉");
        String sellerBirth = sellerRegisterInfo.getBirthDay();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        Seller seller = Seller.builder()
                .id(sellerRegisterInfo.getId())
                .password(passwordEncoder.encode(sellerRegisterInfo.getPassword()))
                .name(sellerRegisterInfo.getName())
                .birthDay(LocalDate.parse(sellerBirth.substring(0,8), formatter).atStartOfDay())
                .gender(sellerBirth.substring(8))
                .phoneNumber(sellerRegisterInfo.getPhoneNumber())
                .companyName(sellerRegisterInfo.getCompanyName())
                .representativeName(sellerRegisterInfo.getRepresentativeName())
                .companyNumber(sellerRegisterInfo.getCompanyNumber())
                .address(sellerRegisterInfo.getAddress())
                .detailAddress(sellerRegisterInfo.getDetailAddress())
                .sellerCategories(sellerRegisterInfo.getCategoryList())
                .build();
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        sellerRepository.save(seller);
        List<SellerCategory> sellerCategories = new ArrayList<>();
        for (SellerCategory S : sellerRegisterInfo.getCategoryList()) {
//            Category category = new Category(S.getCategory().getIdx());
//            System.out.println(category.getIdx());
            SellerCategory sellerCategory = SellerCategory.builder()
                    .seller(seller)
                    .category(categoryRepository.findByCategoryName(S.getCategory().getCategoryName()))
//                    .category(category)
                    .price(S.getPrice())
                    .build();
            sellerCategories.add(sellerCategory);
        }
        sellerCategoryRepository.saveAll(sellerCategories);
        return seller;
    }

    @Override
    public boolean checkDuplicate(SellerCheckDuplicateReq req){
        boolean check = sellerRepository.existsById(req.getId());
        return check;
    }

    @Override
    public SellerLoginRes login(SellerLoginReq req) {
        String userId = req.getId();
        String password = req.getPassword();

        Seller seller = sellerRepository.findSellerById(userId).get();
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, seller.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return SellerLoginRes.of(200, "Success", JwtTokenUtil.getToken(
                            String.valueOf(seller.getIdx())));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return SellerLoginRes.of(401, "Invalid Password", null);
    }
}
