import axios from 'axios';
import RESPONSE_CODE from '@/constants/responseCode';
import { removeToken, getToken, TOKEN_KEY } from './cookie';

const service = (config) => {
  return new Promise((resolve, reject) => {
    const _config = {
      ...config,
      baseURL: process.env.REACT_APP_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(TOKEN_KEY.TOKEN)
          ? `Bearer ${getToken(TOKEN_KEY.TOKEN)}`
          : undefined,
      },
    };
    axios(_config)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        if (
          error?.response?.status === RESPONSE_CODE.NOT_SIGNED_IN &&
          window.location.pathname !== '/dang-nhap'
        ) {
          removeToken(TOKEN_KEY.TOKEN);
          window.location.href = '/dang-nhap';
        }
        if (error?.response?.status === RESPONSE_CODE.EXPECTATION_FAILED) {
          return reject(error?.response);
        }
        return reject(error);
      });
  });
};

export default service;
