package com.ssafy.webgyver.api.service.seller;

import com.ssafy.webgyver.api.request.seller.SellerCheckDuplicateReq;
import com.ssafy.webgyver.api.request.seller.SellerLoginReq;
import com.ssafy.webgyver.api.request.seller.SellerSignUpPostReq;
import com.ssafy.webgyver.api.response.seller.SellerLoginRes;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.common.util.JwtTokenProvider;
import com.ssafy.webgyver.db.entity.RoleType;
import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.entity.SellerCategory;
import com.ssafy.webgyver.db.repository.common.CategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerCategoryRepository;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service("SellerService")
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
    final PasswordEncoder passwordEncoder;
    final SellerRepository sellerRepository;
    final SellerCategoryRepository sellerCategoryRepository;
    final CategoryRepository categoryRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;


    @Transactional
    @Override
    public BaseResponseBody SignUpSeller(SellerSignUpPostReq sellerRegisterInfo) {
        String sellerBirth = sellerRegisterInfo.getBirthDay();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        Seller seller = Seller.builder()
                .id(sellerRegisterInfo.getId())
                .password(passwordEncoder.encode(sellerRegisterInfo.getPassword()))
                .name(sellerRegisterInfo.getName())
                .birthDay(LocalDate.parse(sellerBirth.substring(0, 8), formatter).atStartOfDay())
                .gender(sellerBirth.substring(8))
                .phoneNumber(sellerRegisterInfo.getPhoneNumber())
                .companyName(sellerRegisterInfo.getCompanyName())
                .representativeName(sellerRegisterInfo.getRepresentativeName())
                .companyNumber(sellerRegisterInfo.getCompanyNumber())
                .address(sellerRegisterInfo.getAddress())
                .detailAddress(sellerRegisterInfo.getDetailAddress())
                .lat(sellerRegisterInfo.getLat())
                .lng(sellerRegisterInfo.getLng())
                .point(0)
                .sellerCategories(sellerRegisterInfo.getCategoryList())
                .companyImage("defaultBgImage.png")
                .profileImage("defaultProfileImage.png")
                .roles(Collections.singletonList(RoleType.PARTNER.name()))
                .build();
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        Seller sellerRes = sellerRepository.save(seller);
        List<SellerCategory> sellerCategories = new ArrayList<>();
        for (SellerCategory S : sellerRegisterInfo.getCategoryList()) {
            SellerCategory sellerCategory = SellerCategory.builder()
                    .seller(seller)
                    .category(S.getCategory())
                    .price(S.getPrice())
                    .build();
            sellerCategories.add(sellerCategory);
        }
        sellerCategoryRepository.saveAll(sellerCategories);


        return BaseResponseBody.of(200, "Success");
    }

    @Override
    public BaseResponseBody checkDuplicate(SellerCheckDuplicateReq req) {
        boolean check = sellerRepository.existsById(req.getId());
        if (check) {
            return BaseResponseBody.of(201, "중복된 아이디");
        } else {
            return BaseResponseBody.of(200, "사용 가능한 아이디");
        }
    }

    @Override
    public SellerLoginRes login(SellerLoginReq req) {
        String userId = req.getId();
        String password = req.getPassword();

        Optional<Seller> seller = sellerRepository.findSellerById(userId);
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (!seller.isPresent()){
            return SellerLoginRes.of(201, "해당하는 유저가 존재하지 않습니다.", null, null);
        }
        if (passwordEncoder.matches(password, seller.get().getPassword())) {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, password);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return SellerLoginRes.of(200, "Success", jwtTokenProvider.generateToken(
                    authentication), seller.get().getIdx());
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return SellerLoginRes.of(401, "Invalid Password", null, null);
    }
}
