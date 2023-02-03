package com.ssafy.webgyver.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class TimeUtil {
    public static LocalDateTime string2Time(String stringTime) {
        if (stringTime.length() >= 9) {
            return LocalDateTime.parse(stringTime, DateTimeFormatter.ofPattern("yyyyMMdd-HHmm"));
        }
        return LocalDate.parse(stringTime, DateTimeFormatter.ofPattern("yyyyMMdd")).atStartOfDay();
    }

    public static LocalDateTime string2Time(String stringTime, String format) {
        try {
            return LocalDateTime.parse(stringTime, DateTimeFormatter.ofPattern(format));
        } catch (DateTimeParseException e) {
            return LocalDate.parse(stringTime, DateTimeFormatter.ofPattern(format)).atStartOfDay();
        }
    }

    public static String time2String(LocalDateTime time, String pattern) {
        return time.format(DateTimeFormatter.ofPattern(pattern));
    }

    //월요일$09:00~18:00%화요일$09:00~18:00%수요....,  오늘 날짜 받아서
    // 예약 가능한 모든 시간 리스트로 리턴.
    public static List<String> getAllTime(String bookTime, LocalDateTime today) {
        List<String> splitedBookTime = Arrays.stream(bookTime.split("%")).collect(Collectors.toList());
        String temp1 = splitedBookTime.get(getDayName(today) - 1).substring(4);
        List<String> temp2 = Arrays.stream(temp1.split("~")).collect(Collectors.toList());
        List<String> result = getBetweenTime(temp2.get(0), temp2.get(1));

        return result;
    }

    // start와 end사이의 모든 시간을 15분 간격으로 리스트로 만들어서 리턴.
    public static List<String> getBetweenTime(String start, String end) {
        List<String> result = new ArrayList<>();
        result.add(start);

        int curInt = Integer.parseInt(start.replace(":", ""));
        int endInt = Integer.parseInt(end.replace(":", ""));

        while (curInt < endInt) {
            curInt += 15;
            if (curInt % 100 == 60)
                curInt += 40;
            result.add(String.format("%d:%02d", curInt / 100, curInt % 100));
        }
        return result;

    }

    // 공휴일이면 8, 아니면 월화수목금토일 => 1234567 리턴.
    public static int getDayName(LocalDateTime today) {
        return isHoliday(today) ? 8 : today.toLocalDate().getDayOfWeek().getValue();
    }


    // today가 공휴일인지 판단.
    public static boolean isHoliday(LocalDateTime today) {
        CheckHoliday checkHoliday = new CheckHoliday();
        Set<String> holidayList = checkHoliday.holidayArray(time2String(today, "yyyy"));
        String stringToday = time2String(today, "yyyyMMdd");
        return holidayList.contains(stringToday);
    }
}
