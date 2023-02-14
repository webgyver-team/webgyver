package com.ssafy.webgyver.api.controller.customer;

import com.ssafy.webgyver.api.request.common.reservation.ReservationAllReq;
import com.ssafy.webgyver.api.request.customer.CustomerIdxReq;
import com.ssafy.webgyver.api.request.customer.CustomerReservationNormalListReq;
import com.ssafy.webgyver.api.response.customer.CustomerAddressRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationEndInfoRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationListRes;
import com.ssafy.webgyver.api.response.customer.CustomerReservationNormalListRes;
import com.ssafy.webgyver.api.service.customer.CustomerReservationService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.db.entity.Reservation;
import com.ssafy.webgyver.util.CheckUserUtil;
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
//        webSocket.addRoom(reservation);
        return ResponseEntity.ok(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/normal/store/list/{categoryIdx}/{date}/{lat}/{lng}/{order}")
    public ResponseEntity<CustomerReservationNormalListRes> getOrderedStoreList(
//            @RequestBody CustomerReservationNormalListReq req,
            @PathVariable("categoryIdx") Long categoryIdx,
            @PathVariable("date") String date,
            @PathVariable("lat") double lat,
            @PathVariable("lng") double lng,
            @PathVariable("order") String order
    ) {
        CustomerReservationNormalListReq req = CustomerReservationNormalListReq.builder().categoryIdx(categoryIdx).date(date).lat(lat).lng(lng).build();
        return ResponseEntity.ok(customerReservationService.getOrderedStoreList(order, req));
    }

    @GetMapping("list/{customerIdx}")
    public ResponseEntity<?> getCustomerReservationList(@PathVariable("customerIdx") Long customerIdx, CustomerIdxReq idxReq) {
        CustomerReservationListRes res = customerReservationService.getCustomerReservationList(idxReq);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/completed/list/{customerIdx}")
    public ResponseEntity<?> getCustomerCompletedReservationList(@PathVariable("customerIdx") Long customerIdx, CustomerIdxReq idxReq) {
        CustomerReservationListRes res = customerReservationService.getCustomerCompletedReservationList(idxReq);
        return ResponseEntity.ok(res);
    }

    @GetMapping("address/{customerIdx}")
    public ResponseEntity<?> getCustomerAddress(@PathVariable("customerIdx") Long customerIdx, CustomerIdxReq idxReq) {
        CustomerAddressRes res = customerReservationService.getCustomerAddress(idxReq);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/end/{reservationIdx}")
    public ResponseEntity<CustomerReservationEndInfoRes> getReservationEndInfo(@PathVariable("reservationIdx") Long reservationIdx) {
        CustomerReservationEndInfoRes res = customerReservationService.getReservationEndInfo(reservationIdx);
        return ResponseEntity.ok().body(res);
    }
}
