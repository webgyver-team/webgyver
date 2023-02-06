import Send from './send';

const masterURL = '/api/v1/seller';

export const master = {
  get: {
    history: async (id, data) => {
      const response = await Send.get(
        `${masterURL}/mypage/history/:{${id}}`,
        data,
      );
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
  },
};
