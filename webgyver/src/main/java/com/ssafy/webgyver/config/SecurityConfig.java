package com.ssafy.webgyver.config;


import com.ssafy.webgyver.common.auth.*;
import com.ssafy.webgyver.common.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * 인증(authentication) 와 인가(authorization) 처리를 위한 스프링 시큐리티 설정 정의.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//    private SsafyUserDetailService ssafyUserDetailService;

//    private UserService userService;
    private final CustomCustomerDetailService customCustomerDetailService;
    private final CustomSellerDetailService customSellerDetailService;
    private final SellerProvider sellerProvider;
    private final CustomerProvider customerProvider;
    private final JwtTokenProvider jwtTokenProvider;


    // Password 인코딩 방식에 BCrypt 암호화 방식 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // DAO 기반으로 Authentication Provider를 생성
    // BCrypt Password Encoder와 UserDetailService 구현체를 설정
//    @Bean
//    DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
////        daoAuthenticationProvider.setUserDetailsService(this.ssafyUserDetailService);
//        daoAuthenticationProvider.setUserDetailsService(this.userDetailServiceImpl);
//        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//        return daoAuthenticationProvider;
//    }

    // DAO 기반의 Authentication Provider가 적용되도록 설정
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) {
//        auth.authenticationProvider(authenticationProvider());
//    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(sellerProvider);
        auth.userDetailsService(customSellerDetailService).passwordEncoder(passwordEncoder());
        auth.authenticationProvider(customerProvider);
        auth.userDetailsService(customCustomerDetailService).passwordEncoder(passwordEncoder());
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
//                .addFilter(new JwtAuthenticationFilter(authenticationManager(), customCustomerDetailService)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
//                .addFilter(new JwtAuthenticationFilter(authenticationManager(), customSellerDetailService)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                .authorizeRequests()
                .antMatchers("/api/v1/**/member/**", "/api/v1/common/**").permitAll()
//                .antMatchers().permitAll()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                .anyRequest().hasAnyAuthority("CUSTOMER", "PARTNER")
//                .anyRequest().authenticated();
                .and().cors()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}