package com.ssafy.webgyver.api.service.common;

import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@Service
public class SmsService {
    @Value("${properties.file.sms.access_key}")
    private String ACCESS_KEY;

    @Value("${properties.file.sms.secret_key}")
    private String SECRET_KEY;

    @Value("${properties.file.sms.service_id}")
    private String SERVICE_ID;

    /**
     * 문자 메세지 보내기 서비스
     * 문자 크기에 따라 SMS, LMS 구분해서 전송
     * @param to 보낼 전화번호
     * @param content 보낼 문자 내용
     * @return 문자 전송 여부
     */
    public BaseResponseBody onSendMessage(String to, String content) {
        return BaseResponseBody.of(200, "OK");
        
//        try {
//            String baseUrl = "https://sens.apigw.ntruss.com";
//            String requestUrl = "/sms/v2/services/" + SERVICE_ID + "/messages";
//            URL url = new URL(baseUrl + requestUrl);
//
//            String timeStamp = Long.toString(System.currentTimeMillis());
//
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//            connection.setRequestMethod("POST");
//            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
//            connection.setRequestProperty("x-ncp-apigw-timestamp", timeStamp);
//            connection.setRequestProperty("x-ncp-iam-access-key", ACCESS_KEY);
//
//            String sig = makeSignature(requestUrl, timeStamp);
//            connection.setRequestProperty("x-ncp-apigw-signature-v2", sig);
//            connection.setDoOutput(true);
//
//            JSONArray array = new JSONArray();
//            JSONObject message = new JSONObject();
//            message.put("to", to);
//            array.add(message);
//
//            String type = content.getBytes(Charset.forName("EUC-KR")).length < 90 ? "SMS" : "LMS";
//
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("type", type);
//            jsonObject.put("from", "01098320504");
//            jsonObject.put("content", content);
//            jsonObject.put("messages", array);
//
//            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
//            outputStream.write(jsonObject.toString().getBytes(StandardCharsets.UTF_8));
//            outputStream.flush();
//            outputStream.close();
//
//            System.out.println(connection.getResponseMessage());
//            if(connection.getResponseCode() == 202) {
//                return BaseResponseBody.of(200, "OK");
//
//            } else {
//                return BaseResponseBody.of(connection.getResponseCode(), connection.getResponseMessage());
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return BaseResponseBody.of(500, "Fail");
//        }
    }

    private String makeSignature(String url, String timeStamp) throws Exception {
        String space = " ";
        String newLine = "\n";
        String method = "POST";

        String message = method +
                space +
                url +
                newLine +
                timeStamp +
                newLine +
                ACCESS_KEY;

        SecretKeySpec signingKey = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
        return Base64.encodeBase64String(rawHmac);
    }
}
