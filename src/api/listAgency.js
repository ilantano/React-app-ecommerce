import request from '../utils/request';

export function callApiGetListAgencyByProvider(data) {
  return request({
    url: 'agency/all',
    method: 'post',
    data,
  });
}

export function callApiCreateUserAgencyByProvider(data) {
  return request({
    url: 'agency',
    method: 'post',
    data,
  });
}

export function callApiUpdateUserAgencyByProvider(data) {
  return request({
    url: 'agency',
    method: 'put',
    data,
  });
}
