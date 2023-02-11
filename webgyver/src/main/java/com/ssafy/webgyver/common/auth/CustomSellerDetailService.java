package com.ssafy.webgyver.common.auth;

import com.ssafy.webgyver.db.entity.Seller;
import com.ssafy.webgyver.db.repository.Seller.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomSellerDetailService implements UserDetailsService {
    final SellerRepository sellerRepository;
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        return sellerRepository.findSellerById(id)
                .map(this::createUserDetail)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    private UserDetails createUserDetail(Seller seller){
        return new User(seller.getId(), seller.getPassword(), seller.getAuthorities());
    }
}
