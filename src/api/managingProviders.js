import request from '../utils/request';

export function callApiGetSelectProviders() {
  return request({
    url: 'provider/dropdown-all',
    method: 'get',
  });
}
export function callApiGetSelectPositionProviders() {
  return request({
    url: 'provider/dropdown-role',
    method: 'get',
  });
}

export function callApiGetListUserProviders(data) {
  return request({
    url: 'provider/list-user',
    method: 'post',
    data,
  });
}
export function callApiCreateNewProvider(data) {
  return request({
    url: 'provider/user',
    method: 'post',
    data,
  });
}
export function callApiUpdateProvider(data) {
  return request({
    url: 'provider/user-detail',
    method: 'post',
    data,
  });
}
export function callApiChangeStatusProvider(data) {
  return request({
    url: 'provider/change-status-user',
    method: 'post',
    data,
  });
}
export function callApiDeleteProvider(email) {
  return request({
    url: `provider/user/${email}`,
    method: 'post',
  });
}
