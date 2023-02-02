import axios from 'axios';
import { accessToken } from '../atom';

const instance = axios.create({
  baseURL: '/',
  headers: { Authorization: accessToken },
});

instance.interceptors.request.use(
  // 요청 전
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (config) {
    // 정상 응답
    return config;
  },
  function (error) {
    // 에러 응답
    return Promise.reject(error);
  },
);

export default instance;
