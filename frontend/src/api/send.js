/* eslint-disable no-param-reassign */
import axios from 'axios';
import { accessToken } from '../atom';

const instance = axios.create({
  baseURL: '/',
  timeout: 2000,
});

instance.interceptors.request.use(
  // 요청 전
  (config) => {
    if (accessToken === '') {
      config.headers.Authorization = null;
    } else {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
