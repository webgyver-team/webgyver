package com.ssafy.webgyver.config;


import com.ssafy.webgyver.common.auth.*;
import com.ssafy.webgyver.common.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
                .authorizeRequests()
                .antMatchers("/api/v1/**/member/**", "/api/v1/common/**", "/realtime/**", "/facetime/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/seller/mypage/**", "/api/v1/seller/reservation/address/**", "/api/v1/customer/reservation/address/**").permitAll()
                .anyRequest().hasAnyAuthority("CUSTOMER", "PARTNER")
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