package com.ssafy.webgyver.util;

public class CommonUtil {
    static final double EARTH_RADIUS = 6317;

    public static float getStar(double total, double cnt) {
        if (cnt == 0) return 0;
        return (float) (total / cnt);
    }


    public static double getDistanceWithM(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c * 1000;    // Distance in m
    }

    public static double getDistanceWithKM(double lat1, double lon1, double lat2, double lon2) {
        return getDistanceWithM(lat1, lon1, lat2, lon2) / 1000;
    }
}
