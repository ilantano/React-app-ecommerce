import request from '@/utils/request';

export function callPostApiSignIn(data) {
  return request({
    url: 'login',
    method: 'post',
    data,
  });
}
