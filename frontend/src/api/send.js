/* eslint-disable no-param-reassign */
import axios from 'axios';
// import { useRecoilValue } from 'recoil';
import { accessToken } from '../atom';

const instance = axios.create({
  baseURL: 'http://i8b101.p.ssafy.io:9000',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line
// const token = useRecoilValue(accessToken);
// console.log(token);
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
    return config.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
