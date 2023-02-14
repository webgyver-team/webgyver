package com.ssafy.webgyver.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleType {
    CUSTOMER("고객"),
    PARTNER("파트너");
    private final String role;
}
