package com.ssafy.webgyver.util;

public class CommonUtil {

    public static float getStar(double total, double cnt) {
        if (cnt == 0) return 0;
        return (float) (total / cnt);
    }
}
