import Send from './send';

const masterURL = '/api/v1/seller';

export const master = {
  get: {
    myPage: async (id) => {
      const response = await Send.get(`${masterURL}/mypage/intro/${id}`);
      return response;
    },
    example: async (id) => {
      const response = await Send.get(`${masterURL}/mypage/history/${id}`);
      return response;
    },
  },
  post: {
    reviews: async (data) => {
      const response = await Send.post(`${masterURL}/review`, data);
      return response;
    },
    reservation: async (data) => {
      const response = await Send.post(
        `${masterURL}/reservation/normal/regist`,
        data,
      );
      return response;
    },
    example: async (data) => {
      const response = await Send.post(`${masterURL}/mypage/history/`, data);
      return response;
    },
  },
  put: {
    profile: async (data, idx) => {
      const response = await Send.put(
        `${masterURL}/mypage/profile/${idx}`,
        data,
      );
      return response;
    },
    description: async (data, idx) => {
      const response = await Send.put(
        `${masterURL}/mypage/intro/description/${idx}`,
        data,
      );
      return response;
    },
    example: async (data, idx) => {
      const response = await Send.put(
        `${masterURL}/mypage/history/${idx}`,
        data,
      );
      return response;
    },
    businessHour: async (data, idx) => {
      const response = await Send.put(
        `${masterURL}/mypage/intro/time/${idx}`,
        data,
      );
      return response;
    },
  },
  delete: {
    example: async (idx) => {
      const response = await Send.delete(`${masterURL}/mypage/history/${idx}`);
      return response;
    },
  },
};
