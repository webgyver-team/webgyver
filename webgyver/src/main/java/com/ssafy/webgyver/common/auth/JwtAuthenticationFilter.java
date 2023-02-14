package com.ssafy.webgyver.common.auth;

import com.ssafy.webgyver.common.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;
    private static final String AUTHORITIES_KEY = "access-token";
    private static final String BEARER_TYPE = "Bearer";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 1. Request Header 에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) request);
        System.out.println("token provider :" + jwtTokenProvider.validateToken(token));
        // 2. validateToken 으로 토큰 유효성 검사
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // (추가) Redis 에 해당 accessToken logout 여부 확인
//            String isLogout = (String) redisTemplate.opsForValue().get(token);
//            if (ObjectUtils.isEmpty(isLogout)) {
                // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
            System.out.println("authentication : " + authentication);
                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
        }
        chain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORITIES_KEY);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
