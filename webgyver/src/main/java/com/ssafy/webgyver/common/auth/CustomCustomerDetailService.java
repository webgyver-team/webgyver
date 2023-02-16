package com.ssafy.webgyver.common.auth;

import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.repository.customer.CustomerMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomCustomerDetailService implements UserDetailsService {
    private final CustomerMemberRepository customerRepository;
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        return customerRepository.findCustomerById(id)
                .map(this::createUserDetail)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    private UserDetails createUserDetail(Customer customer){
        return new User(customer.getId(), customer.getPassword(), customer.getAuthorities());
    }
}
