package com.ssafy.webgyver.api.response.customer;

import com.ssafy.webgyver.common.model.response.DataResponseBody;
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
        private String companyName;
        private List<PictureDTO> imageList;
        private Long state;
        private Long type;

        public ReservationDTO(Long reservationIdx, String title, LocalDateTime time, String content, String storeName, List<PictureDTO> pictureList, String state, String type) {
            this.reservationIdx = reservationIdx;
            this.title = title;
            this.reservationTime = time;
            this.content = content;
            this.companyName = storeName;
            this.imageList = pictureList;
            this.state = Long.parseLong(state);
            this.type = Long.parseLong(type);
        }
    }
    @Getter
    @NoArgsConstructor
    public static class PictureDTO{
        private Long imageIdx;
        private String originName;
        private String saveName;

        public PictureDTO(Long pictureIdx, String originName, String saveName) {
            this.imageIdx = pictureIdx;
            this.originName = originName;
            this.saveName = saveName;
        }
    }

    public static CustomerReservationListRes of(Integer statusCode, String message, List<ReservationDTO> reservationList) {
        CustomerReservationListRes res = new CustomerReservationListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        // 예약 정보 넣기
        res.getData().put("reservationList", reservationList);
        return res;
    }
}
