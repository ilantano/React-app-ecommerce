import request from '@/utils/request';

export function callPostCheckOTP(otp, data) {
  return request({
    url: `user/${otp}/check`,
    method: 'post',
    data,
  });
}

export function callPostChangePassword(data) {
  return request({
    url: `change-password`,
    method: 'post',
    data,
  });
}
