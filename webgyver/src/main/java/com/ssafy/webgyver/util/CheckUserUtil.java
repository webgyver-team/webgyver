package com.ssafy.webgyver.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class CheckUserUtil {
    // 가져온 토큰 정보를 갖고 유저를 확인하여 변경대상이 토큰 주인과 맞는지 확인한다.
    public static boolean check(String id){
        String tokenName = SecurityContextHolder.getContext().getAuthentication().getName();
        if (id.equals(tokenName)){
            return true;
        }
        return false;
    }

}
