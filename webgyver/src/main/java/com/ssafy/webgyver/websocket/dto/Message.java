package com.ssafy.webgyver.websocket.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class Message {
    private MethodType method;
    private Map<String, Object> data;

    public Message(MethodType method) {
        this.method = method;
    }

}
