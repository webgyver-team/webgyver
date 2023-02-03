package com.ssafy.webgyver.api.controller.common;

import com.ssafy.webgyver.websocket.WebSocket;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/common/reservation")
public class ReservationController {

    final WebSocket webSocket;

    @GetMapping("/info/{reservationIdx}")
    public ResponseEntity<Map<String, Object>> getReservationInfo(@PathVariable("reservationIdx") Long reservationIdx) {
        return ResponseEntity.ok(webSocket.roomInfo(reservationIdx));
    }
}
