import axios from 'axios';
import RESPONSE_CODE from '@/constants/responseCode';
import { getToken, TOKEN_KEY } from './cookie';

export const service = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: getToken(TOKEN_KEY.TOKEN)
        ? `Bearer ${getToken(TOKEN_KEY.TOKEN)}`
        : undefined,
    };
    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === RESPONSE_CODE.NOT_SIGNED_IN) {
      window.location.href = '/admin/sign-in';
    }
    if (error?.response?.status === RESPONSE_CODE.EXPECTATION_FAILED) {
      return Promise.reject(error?.response);
    }
    return Promise.reject(error);
  },
);

export default service;
