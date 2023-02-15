import Send from './send';

const masterURL = '/api/v1/seller';

export const master = {
  get: {
    schedule: async (id) => {
      const response = await Send.get(`${masterURL}/reservation/list/${id}`);
      return response;
    },
    myPage: async (id) => {
      const response = await Send.get(`${masterURL}/mypage/intro/${id}`);
      return response;
    },
    example: async (id) => {
      const response = await Send.get(`${masterURL}/mypage/history/${id}`);
      return response;
    },
    review: async (id) => {
      const response = await Send.get(`${masterURL}/mypage/review/${id}`);
      return response;
    },
    history: async (id, day) => {
      const response = await Send.get(
        `${masterURL}/reservation/calendar/${id}/${day}`,
      );
      return response;
    },
    booktime: async (id) => {
      const response = await Send.get(`${masterURL}/mypage/booktime/${id}`);
      return response;
    },
    endservice: async (id) => {
      const response = await Send.get(`${masterURL}/reservation/end/${id}`);
      return response;
    },
  },
  post: {
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
    review: async (data) => {
      const response = await Send.post(`${masterURL}/mypage/comment`, data);
      return response;
    },
  },
  put: {
    schedule: async (reservationIdx, acceptFlag) => {
      const response = await Send.put(
        `${masterURL}/reservation/accept/${reservationIdx}/${acceptFlag}`,
      );
      return response;
    },
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
    review: async (data, idx) => {
      const response = await Send.put(
        `${masterURL}/mypage/comment/${idx}`,
        data,
      );
      return response;
    },
    booktime: async (data, id) => {
      const response = await Send.put(
        `${masterURL}/mypage/booktime/${id}`,
        data,
      );
      return response;
    },
    point: async (data, idx) => {
      const response = await Send.put(
        `${masterURL}/mypage/exchange/${idx}`,
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
    review: async (idx) => {
      const response = await Send.delete(`${masterURL}/mypage/comment/${idx}`);
      return response;
    },
  },
};
