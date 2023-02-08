package com.ssafy.webgyver.api.response.seller;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

public class SellerReservationListRes extends DataResponseBody {
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

    public static SellerReservationListRes of(Integer statusCode, String message, List<ReservationDTO> proceedingList, List<ReservationDTO> waitingList, List<ReservationDTO> todayList) {
        SellerReservationListRes res = new SellerReservationListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        // 예약 정보 넣기
//        Response response = new Response(reservationList);
        res.getData().put("proceedList", proceedingList);
        res.getData().put("waitingList", waitingList);
        res.getData().put("todayList", todayList);
        return res;
    }
}
