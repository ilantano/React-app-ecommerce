import request from '../utils/request';

export function callApiGetAllProvider(data) {
  return request({
    url: 'provider/all',
    method: 'post',
    data,
  });
}

export function callApiCreateProviders(data) {
  return request({
    url: 'provider',
    method: 'post',
    data,
  });
}
export function callApiUpdateProviders(data) {
  return request({
    url: 'provider',
    method: 'put',
    data,
  });
}
