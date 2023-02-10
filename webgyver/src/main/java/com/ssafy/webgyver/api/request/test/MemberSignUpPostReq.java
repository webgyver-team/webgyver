package com.ssafy.webgyver.api.request.test;

import com.ssafy.webgyver.db.entity.RoleType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberSignUpPostReq {
    Long id;
    String password;
    String name;
    int age;
    String description;
    RoleType roleType;
}
