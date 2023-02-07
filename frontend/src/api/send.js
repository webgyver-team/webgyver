/* eslint-disable */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://i8b101.p.ssafy.io:9000',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  // 요청 전
  (config) => {
    const storage = JSON.parse(sessionStorage.getItem('recoil-persist'));
    if (
      storage === null ||
      !Object.keys(storage).includes('accessToken') ||
      storage.accessToken === ''
    ) {
      config.headers.Authorization = null;
    } else {
      config.headers.Authorization = storage.accessToken;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    console.log(config.data);
    return config.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
