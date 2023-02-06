import Send from './send';

const customerURL = 'api/v1/customer';
export const customer = {
  // customer
  checkDuplicate: async (data) => {
    const response = await Send.post(
      `${customerURL}/member/check/duplicate/`,
      data,
    );
    return response;
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

const masterURL = '/api/v1/seller/';
export const master = {
  // customer
  checkDuplicate: async (data) => {
    const response = await Send.post(
      `${masterURL}member/check/duplicate/`,
      data,
    );
    return response;
  },

  signup: async (data) => {
    const response = await Send.post(`${masterURL}member/join/`, data);
    return response;
  },

  login: async (data) => {
    const response = await Send.post(`${masterURL}member/login/`, data);
    return response;
  },
};
