package com.ssafy.webgyver.websocket.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class Message {
    private MethodType method;
    private Map<String,Object> data;

    //    public String method;
//    public Message(String method){
//        this.method = method;
//    }
    public Message(MethodType method) {
        this.method = method;
    }

}
