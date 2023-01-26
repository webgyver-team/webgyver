package com.ssafy.webgyver.api.service.Seller;

import com.ssafy.webgyver.api.request.Seller.SellerSignUpPostReq;
import com.ssafy.webgyver.db.entity.Seller;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service("SellerSevice")
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService{
    final PasswordEncoder passwordEncoder;

    @Override
    public Seller SignUpSeller(SellerSignUpPostReq sellerRegisterInfo) {
        System.out.println("서비스 들어왔엉");
        Seller seller = new Seller();
        seller.setId(sellerRegisterInfo.getId());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        seller.setPassword(passwordEncoder.encode(sellerRegisterInfo.getPassword()));
        seller.setName(sellerRegisterInfo.getName());
        String sellerBirth = sellerRegisterInfo.getBirthDay();

        seller.setBirthDay(LocalDateTime.parse(sellerBirth.substring(0,6)));
        seller.setGender(sellerBirth.substring(7));
        seller.setPhoneNumber(sellerRegisterInfo.getPhoneNumber());
        seller.setCompanyName(sellerRegisterInfo.getCompanyName());
        seller.setRepresentativeName(sellerRegisterInfo.getRepresentativeName());
        seller.setCompanyNumber(sellerRegisterInfo.getCompanyNumber());
        seller.setAddress(sellerRegisterInfo.getAddress());
        seller.setDetailAddress(sellerRegisterInfo.getDetailAddress());
        sellerC
        testMemberRepository.save(member);
        seller.
        seller.setRoleType(sellerRegisterInfo.getRoleType());
        return member;
    }
}
