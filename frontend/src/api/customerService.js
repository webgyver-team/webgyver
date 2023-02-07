import Send from './send';

const customerURL = '/api/v1/customer';

export const customer = {
  get: {
    stores: async (order, data) => {
      const response = await Send.get(
        `${customerURL}/reservation/normal/store/list/${order}`,
        data,
      );
      return response;
    },
  },
  post: {
    reviews: async (data) => {
      const response = await Send.post(`${customerURL}/review`, data);
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
};
