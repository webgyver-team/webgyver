package com.ssafy.webgyver.api.controller.seller;

import com.ssafy.webgyver.api.request.customer.CustomerIdxReq;
import com.ssafy.webgyver.api.request.seller.SellerAcceptReservationReq;
import com.ssafy.webgyver.api.request.seller.SellerCalendarReq;
import com.ssafy.webgyver.api.request.seller.SellerIdxReq;
import com.ssafy.webgyver.api.response.customer.CustomerAddressRes;
import com.ssafy.webgyver.api.response.seller.SellerAddressRes;
import com.ssafy.webgyver.api.response.seller.SellerReservationEndInfoRes;
import com.ssafy.webgyver.api.response.seller.SellerReservationListRes;
import com.ssafy.webgyver.api.service.seller.SellerReservationService;
import com.ssafy.webgyver.common.model.response.BaseResponseBody;
import com.ssafy.webgyver.util.TimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/seller/reservation")
public class SellerReservationController {
    final SellerReservationService sellerReservationService;

    @GetMapping("/list/{sellerIdx}")
    public ResponseEntity<?> getSellerReservationList(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq idxReq) {
        SellerReservationListRes res = sellerReservationService.getSellerReservationList(idxReq);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/accept/{reservationIdx}/{acceptFlag}")
    public ResponseEntity<?> updateReservationState(@PathVariable Long reservationIdx, @PathVariable boolean acceptFlag) {
        SellerAcceptReservationReq req = new SellerAcceptReservationReq(reservationIdx, acceptFlag);
        BaseResponseBody res = sellerReservationService.updateAcceptReservation(req);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/calendar/{sellerIdx}/{day}")
    public ResponseEntity<?> getSellerCalendarReservation(@PathVariable Long sellerIdx, @PathVariable String day) {
        SellerCalendarReq req = new SellerCalendarReq(sellerIdx, TimeUtil.string2Time(day));
        SellerReservationListRes res = sellerReservationService.getSellerCalendarReservationList(req);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("end/{reservationIdx}")
    public ResponseEntity<SellerReservationEndInfoRes> getSellerReservationEndInfo(@PathVariable("reservationIdx") long reservationIdx) {
        SellerReservationEndInfoRes res = sellerReservationService.getSellerReservationEndInfo(reservationIdx);
        return ResponseEntity.ok().body(res);
    }
    @GetMapping("address/{sellerIdx}")
    public ResponseEntity<SellerAddressRes> getCustomerAddress(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq idxReq) {
        SellerAddressRes res = sellerReservationService.getSellerAddress(idxReq);
        return ResponseEntity.ok().body(res);
    }
}
