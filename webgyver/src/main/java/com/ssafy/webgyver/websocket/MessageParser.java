package com.ssafy.webgyver.websocket;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class MessageParser {

    public static Message parse(String jsonString) {
//        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        Gson gson = new Gson();
        try {
            Message message = gson.fromJson(jsonString, Message.class);
            System.out.println(message.method);
            return message;
        } catch (Exception e) {
            System.out.println("파싱 중 에러 발생");
            return new Message(MessageType.WANT_MEET);
        }
//        System.out.println(message.method);
    }
}
