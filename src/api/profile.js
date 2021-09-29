import request from '../utils/request';

export function callApiGetInfoProfile() {
  return request({
    url: 'user',
    method: 'get',
  });
}

export function callApiUpdateInfoProfile(data) {
  return request({
    url: 'user',
    method: 'put',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
