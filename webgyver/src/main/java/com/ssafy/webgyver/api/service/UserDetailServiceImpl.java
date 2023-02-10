package com.ssafy.webgyver.api.service;

import com.ssafy.webgyver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByEmail(username);
//
//        if (user == null)
//            throw new UserServiceException("user not exist !");
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getEmail(),
//                user.getEncryptedPwd(),
//                true,
//                true,
//                true,
//                true,
//                new ArrayList<>()
//        );
        return null;
    }
}
