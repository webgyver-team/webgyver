package com.ssafy.webgyver.util;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

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

    /**
     * @param customerKey customerKey in Customer Entity
     * @param billingKey  billingKey in Customer Entity
     * @param orderName   reservation title
     * @param price       solution pay price
     * @return 200 - ok, 500 - fail, 204 - billing error, please check message
     */
    public static BaseResponseBody requestPay(String tossKey, String customerKey, String billingKey, String orderName, int price) {
        try {
            URL url = new URL("https://api.tosspayments.com/v1/billing/" + billingKey);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", tossKey);
            connection.setDoOutput(true);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("customerKey", customerKey);
            jsonObject.put("amount", price); //가격
            jsonObject.put("orderId", UUID.randomUUID().toString()); //주문 ID - 무작위값 설정하여 사용
            jsonObject.put("orderName", orderName); //주문 명

            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.write(jsonObject.toString().getBytes("UTF-8"));
            outputStream.flush();
            outputStream.close();

            int respCode = connection.getResponseCode(); // New items get NOT_FOUND on PUT
            if (respCode == HttpURLConnection.HTTP_OK) {
                return BaseResponseBody.of(200, "Success");

            } else {
                System.out.println(connection.getResponseCode());
                System.out.println(connection.getResponseMessage());
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                JSONParser parser = new JSONParser();
                JSONObject resObject = (JSONObject) parser.parse(reader.readLine());
                System.out.println(resObject);
                return BaseResponseBody.of(204, resObject.get("message").toString());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponseBody.of(500, "Fail");
        }
    }
}
