package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import com.ssafy.webgyver.db.entity.Customer;
import com.ssafy.webgyver.db.entity.Reservation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

public class CustomerReservationListRes extends DataResponseBody {
    @Getter
    @NoArgsConstructor
    public static class Response {
        List<ReservationDTO> reservationDTOList;
        Response(List<ReservationDTO> list) {
            this.reservationDTOList = list;
        }
    }
    @Getter
    @NoArgsConstructor
    @ToString
    public static class ReservationDTO{
        private Long reservationIdx;
        private String title;
        private LocalDateTime reservationTime;
        private String content;
        private String storeName;
        private List<PictureDTO> pictureList;
        private String state;
        private String type;

        public ReservationDTO(Long reservationIdx, String title, LocalDateTime time, String content, String storeName, List<PictureDTO> pictureList, String state, String type) {
            this.reservationIdx = reservationIdx;
            this.title = title;
            this.reservationTime = time;
            this.content = content;
            this.storeName = storeName;
            this.pictureList = pictureList;
            this.state = state;
            this.type = type;
        }
    }
    @Getter
    @NoArgsConstructor
    public static class PictureDTO{
        private Long pictureIdx;
        private String originName;
        private String saveName;

        public PictureDTO(Long pictureIdx, String originName, String saveName) {
            this.pictureIdx = pictureIdx;
            this.originName = originName;
            this.saveName = saveName;
        }
    }

    public static CustomerReservationListRes of(Integer statusCode, String message, List<ReservationDTO> reservationList) {
        CustomerReservationListRes res = new CustomerReservationListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        // 예약 정보 넣기
//        Response response = new Response(reservationList);

        res.getData().put("reservationList", reservationList);

        return res;
    }
}
