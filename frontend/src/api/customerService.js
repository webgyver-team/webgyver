import Send from './send';

const customerURL = '/api/v1/customer/';

export const customer = {
  // customer
  getStores: async (order, data) => {
    const response = await Send.get(
      `${customerURL}reservation/normal/store/list/:{${order}}`,
      data,
    );
    return response.statusCode;
  },
};
