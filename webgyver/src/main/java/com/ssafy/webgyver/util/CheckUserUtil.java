package com.ssafy.webgyver.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class CheckUserUtil {
    public static boolean check(String id){
        System.out.println("SecurityContext : " + SecurityContextHolder.getContext().getAuthentication().getName());
        String tokenName = SecurityContextHolder.getContext().getAuthentication().getName();
        if (id.equals(tokenName)){
            return true;
        }
        return false;
    }

}
