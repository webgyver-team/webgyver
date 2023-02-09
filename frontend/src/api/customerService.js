/* eslint-disable */
import Send from './send';

const customerURL = '/api/v1/customer';

export const customer = {
  get: {
    stores: async (order, data) => {
      const response = await Send.get(
        `${customerURL}/reservation/normal/store/list/${data.categoryIdx}/${data.date}/${data.lat}/${data.lng}/${order}`,
      );
      return response;
    },
    reservationHistory: async (idx) => {
      const response = await Send.get(`${customerURL}/reservation/list/${idx}`);
      return response;
    },
    completeHistory: async (idx) => {
      const response = await Send.get(
        `${customerURL}/reservation/completed/list/${idx}`,
      );
      return response;
    },
    myInfo: async (idx) => {
      const response = await Send.get(`${customerURL}/mypage/profile/${idx}`);
      return response;
    },
    reviews: async (cIdx) => {
      const response = await Send.get(`${customerURL}/mypage/review/${cIdx}`);
      return response;
    },
    review: async (rIdx) => {
      const response = await Send.get(
        `${customerURL}/mypage/review/detail/${rIdx}`,
      );
      return response;
    },
  },
  post: {
    review: async (data) => {
      const response = await Send.post(`${customerURL}/mypage/review`, data);
      return response;
    },
    reservation: async (data) => {
      const response = await Send.post(
        `${customerURL}/reservation/normal/regist`,
        data,
      );
      return response;
    },
  },
  put: {
    profile: async (data, idx) => {
      const response = await Send.put(
        `${customerURL}/mypage/profile/${idx}`,
        data,
      );
      return response;
    },
    review: async (data, idx) => {
      const response = await Send.put(
        `${customerURL}/mypage/review/${idx}`,
        data,
      );
      return response;
    },
  },
};
