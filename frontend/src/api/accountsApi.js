import Send from './send';

const customerURL = '/api/v1/customer/';
export const customer = {
  // customer
  checkDuplicate: async (data) => {
    const response = await Send.post(`${customerURL}check/duplicate/`, data);
    return response.statusCode;
  },

  signup: async (data) => {
    const response = await Send.post(`${customerURL}member/join/`, data);
    return response.statusCode;
  },

  login: async (data) => {
    const response = await Send.post(`${customerURL}member/login/`, data);
    return response;
  },
};

const partnerURL = '/api/v1/partner/';
export const partner = {
  // customer
  checkDuplicate: async (data) => {
    const response = await Send.post(`${partnerURL}check/duplicate/`, data);
    return response;
  },

  signup: async (data) => {
    const response = await Send.post(`${partnerURL}member/join/`, data);
    return response;
  },

  login: async (data) => {
    const response = await Send.post(`${partnerURL}member/login/`, data);
    return response;
  },
};
