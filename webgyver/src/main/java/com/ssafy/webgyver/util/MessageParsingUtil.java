package com.ssafy.webgyver.util;

import com.google.gson.Gson;
import com.ssafy.webgyver.websocket.dto.Message;
import com.ssafy.webgyver.websocket.dto.MethodType;

import java.util.Map;

public class MessageParsingUtil {

    public static Message parsingMessage(String jsonString) {
        Gson gson = new Gson();
        Map<String, Object> map = gson.fromJson(jsonString, Map.class);
        Message message = new Message();
        message.setMethod(MethodType.valueOf((String) map.remove("method")));
        message.setData(map);
        System.out.println("@@@@@@@@@@@" + map);
        System.out.println(message);
        return message;
    }
}
