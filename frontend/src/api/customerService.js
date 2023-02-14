/* eslint-disable */
import Send from './send';

const customerURL = '/api/v1/customer';
const masterURL = '/api/v1/seller';

export const customer = {
  get: {
    //예약상담 마스터 리스트 조회
    stores: async (order, data) => {
      const response = await Send.get(
        `${customerURL}/reservation/normal/store/list/${data.categoryIdx}/${data.date}/${data.lat}/${data.lng}/${order}`,
      );
      return response;
    },
    //예약내역 조회
    reservationHistory: async (idx) => {
      const response = await Send.get(`${customerURL}/reservation/list/${idx}`);
      return response;
    },
    //종료한 상담 정보 조회
    endService: async (idx) => {
      const response = await Send.get(`${customerURL}/reservation/end/${idx}`);
      return response;
    },
    //완료내역 조회
    completeHistory: async (idx) => {
      const response = await Send.get(
        `${customerURL}/reservation/completed/list/${idx}`,
      );
      return response;
    },
    //내 정보 조회
    myInfo: async (idx) => {
      const response = await Send.get(`${customerURL}/mypage/profile/${idx}`);
      return response;
    },
    //내 리뷰 목록 조회
    reviews: async (cIdx) => {
      const response = await Send.get(`${customerURL}/mypage/review/${cIdx}`);
      return response;
    },
    //리뷰 상세 조회
    review: async (rIdx) => {
      const response = await Send.get(
        `${customerURL}/mypage/review/detail/${rIdx}`,
      );
      return response;
    },
    masterInfo: async (idx) => {
      const response = await Send.get(`${masterURL}/mypage/intro/${idx}`);
      return response;
    },
    masterHistory: async (idx) => {
      const response = await Send.get(`${masterURL}/mypage/history/${idx}`);
      return response;
    },
    masterReview: async (idx) => {
      const response = await Send.get(`${masterURL}/mypage/review/${idx}`);
      return response;
    },
    locate: async (idx) => {
      const response = await Send.get(`${customerURL}/reservation/address/${idx}`);
      return response;
    },
  },
  post: {
    //리뷰 등록
    review: async (data) => {
      const response = await Send.post(`${customerURL}/mypage/review`, data);
      return response;
    },
    //예약상담 등록
    reservation: async (data) => {
      const response = await Send.post(
        `${customerURL}/reservation/normal/regist`,
        data,
      );
      return response;
    },
  },
  put: {
    //내 정보 수정
    profile: async (data, idx) => {
      const response = await Send.put(
        `${customerURL}/mypage/profile/${idx}`,
        data,
      );
      return response;
    },
    //리뷰 수정
    review: async (data, idx) => {
      const response = await Send.put(
        `${customerURL}/mypage/review/${idx}`,
        data,
      );
      return response;
    },
  },
  delete: {
    //리뷰 삭제
    review: async (idx) => {
      const response = await Send.delete(`${customerURL}/mypage/review/${idx}`);
      return response;
    },
  },
};
