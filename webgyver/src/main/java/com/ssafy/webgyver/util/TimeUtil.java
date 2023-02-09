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
    // 패턴 인자로 안받고 LocalDateTime으로 바꿔줌. stringTime의 길이로 분기함.
    public static LocalDateTime string2Time(String stringTime) {
        if (stringTime.length() >= 9) {
            return LocalDateTime.parse(stringTime, DateTimeFormatter.ofPattern("yyyyMMdd-HHmm"));
        }
        return LocalDate.parse(stringTime, DateTimeFormatter.ofPattern("yyyyMMdd")).atStartOfDay();
    }

    // 패턴을 인자로 받음. '년월일'만 있는 경우에는 ParsingError가 발생하므로 LocalDate로 바꿔서 00시 00분으로 바꾼다.
    public static LocalDateTime string2Time(String stringTime, String format) {
        try {
            return LocalDateTime.parse(stringTime, DateTimeFormatter.ofPattern(format));
        } catch (DateTimeParseException e) {
            return LocalDate.parse(stringTime, DateTimeFormatter.ofPattern(format)).atStartOfDay();
        }
    }

    // LocalDateTime과 패턴을 인자로 받아서 String으로 바꾼다.
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

    public static LocalDateTime getNeareastHourIn15Inc(LocalDateTime time) {

        int[] dMinute = {0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7};
        for (int dm : dMinute) {
            int temp = time.plusMinutes(dm).getMinute();
            if (temp == 0 || temp == 15 || temp == 30 || temp == 45) {
                return time.plusMinutes(dm);
            }
        }
        return null;
    }

}
