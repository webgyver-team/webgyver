package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerSignUpPostReq;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
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
                .category(sellerRegisterInfo.getCategoryList())
                .build();
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        sellerRepository.save(seller);
//        SellerCategory sellerCategory = SellerCategory.builder()
//                .selleres(seller)
//                .category()
//                .price(sellerRegisterInfo.getCategoryList())
//                .build();

//        sellerCategoryRepository.save()
        return seller;
    }
}
