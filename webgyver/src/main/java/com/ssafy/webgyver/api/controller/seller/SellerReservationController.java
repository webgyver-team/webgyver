package com.ssafy.webgyver.api.controller.seller;

import com.ssafy.webgyver.api.request.customer.CustomerIdxReq;
import com.ssafy.webgyver.api.request.seller.SellerIdxReq;
import com.ssafy.webgyver.api.response.customer.CustomerReservationListRes;
import com.ssafy.webgyver.api.response.seller.SellerReservationListRes;
import com.ssafy.webgyver.api.service.Seller.SellerReservationService;
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
    public ResponseEntity<?> getCustomerCompletedReservationList(@PathVariable("sellerIdx") Long sellerIdx, SellerIdxReq idxReq){
        SellerReservationListRes res = sellerReservationService.getSellerReservationList(idxReq);
        return ResponseEntity.ok(res);
    }
}
