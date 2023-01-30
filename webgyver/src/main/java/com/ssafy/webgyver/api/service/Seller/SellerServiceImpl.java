package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.Seller.SellerSignUpPostReq;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.repository.Seller.CategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service("SellerSevice")
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
            SellerCategory sellerCategory = SellerCategory.builder()
                    .seller(seller)
                    .category(categoryRepository.findByCategoryName(S.getCategory().getCategoryName()))
                    .price(S.getPrice())
                    .build();
            sellerCategories.add(sellerCategory);
        }
        sellerCategoryRepository.saveAll(sellerCategories);
        return seller;
    }

    @Override
    public boolean checkDuplicate(SellerCheckDuplicateReq req){
        System.out.println();
        boolean check = sellerRepository.existsById(req.getId());
        System.out.println(check);
        return check;
    }
}
