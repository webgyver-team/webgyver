package com.ssafy.webgyver.api.controller.customer;

import com.ssafy.webgyver.api.request.common.reservation.ReservationAllReq;
import com.ssafy.webgyver.api.request.customer.CustomerIdxReq;
import com.ssafy.webgyver.api.request.customer.CustomerReservationNormalListReq;
import com.ssafy.webgyver.api.response.customer.CustomerReservationNormalListRes;
import com.ssafy.webgyver.api.service.customer.CustomerReservationService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.websocket.WebSocketFaceTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/customer/reservation")
public class CustomerReservationController {
    final CustomerReservationService customerReservationService;
    final WebSocketFaceTime webSocket;

    // 일반상담 등록
    @PostMapping("/normal/regist")
    public ResponseEntity<BaseResponseBody> regist(@RequestBody ReservationAllReq req) {
        // 작업 프로세스
        // 1. Reservation에 먼저 등록
        // 2. 등록된 Reservation IDX 를 가지고 Article 등록
        // 3. 등록된 Article IDX 를 가지고 Picture들 등록.
        Reservation reservation = customerReservationService.save(req);
        webSocket.addRoom(reservation);
        return ResponseEntity.ok(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/normal/store/list/{order}")
    public ResponseEntity<CustomerReservationNormalListRes> getOrderedStoreList(@RequestBody CustomerReservationNormalListReq req, @PathVariable("order") String order) {
        return ResponseEntity.ok(customerReservationService.getOrderedStoreList(order, req));
    }

    @GetMapping("list/{customerIdx}")
    public ResponseEntity<?> getCustomerReservationList(@PathVariable("customerIdx") Long customerIdx, CustomerIdxReq idxReq) {
        customerReservationService.getCustomerReservationList(idxReq);
        return null;
    }
}
