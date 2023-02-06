import Send from './send';

const customerURL = 'http://i8b101.p.ssafy.io:9001/api/v1/customer';
export const customer = {
  // customer
  checkDuplicate: async (data) => {
    const response = await Send.post(
      `${customerURL}/member/check/duplicate/`,
      data,
    );
    return response.status;
  },

  signup: async (data) => {
    const response = await Send.post(`${customerURL}/member/join/`, data);
    return response;
  },

  login: async (data) => {
    const response = await Send.post(`${customerURL}/member/login/`, data);
    return response;
  },
};

const sellerURL = 'http://i8b101.p.ssafy.io:9001/api/v1/seller';
export const seller = {
  // seller
  checkDuplicate: async (data) => {
    const response = await Send.post(
      `${sellerURL}/member/check/duplicate/`,
      data,
    );
    return response;
  },

  signup: async (data) => {
    const response = await Send.post(`${sellerURL}member/join/`, data);
    return response;
  },

  login: async (data) => {
    const response = await Send.post(`${sellerURL}member/login/`, data);
    return response;
  },
};

const commonUrl = 'http://i8b101.p.ssafy.io:9000/api/v1/common';

export const common = {
  getCategoryList: async () => {
    const response = await Send.get(`${commonUrl}/category/list`);
    return response;
  },
};
