import request from '../utils/request';

export function callApiSendNumberConfirm(data) {
  return request({
    url: '/reset-password',
    method: 'post',
    data,
  });
}

export function callApiCheckTokenExpired(params) {
  return request({
    url: '/user/check-token-expired',
    method: 'get',
    params,
  });
}

export function callApiResetPassword(data) {
  return request({
    url: 'user/reset-password',
    method: 'put',
    data,
  });
}
