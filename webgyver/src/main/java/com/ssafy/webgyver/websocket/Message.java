package com.ssafy.webgyver.websocket;

public class Message {
    public MessageType method;

    public Message(MessageType method) {
        this.method = method;
    }
}
