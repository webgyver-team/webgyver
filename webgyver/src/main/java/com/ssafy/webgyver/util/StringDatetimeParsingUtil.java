package com.ssafy.webgyver.util;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class StringDatetimeParsingUtil {
    public static LocalDateTime string2Time(String stringTime) {
        return LocalDateTime.parse(stringTime, DateTimeFormatter.ofPattern("yyyyMMdd-HHmm"));
    }
}
