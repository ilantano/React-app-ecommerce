import request from '../utils/request';

export function callApiGetListAgency() {
  return request({
    url: 'agency/list-agency',
    method: 'get',
  });
}

export function callApiGetListUserAgency(data) {
  return request({
    url: 'agency/list-user-agency',
    method: 'post',
    data,
  });
}

export function callApiCreateUserAgency(data) {
  return request({
    url: 'agency/create-user-agency',
    method: 'post',
    data,
  });
}

export function callApiDeleteUserAgency(params) {
  return request({
    url: 'agency/delete-user-agency',
    method: 'post',
    params,
  });
}

export function callApiActionUserAgency(params) {
  return request({
    url: 'agency/action-user-agency',
    method: 'post',
    params,
  });
}

export function callApiGetUpdateUserAgency(data) {
  return request({
    url: 'agency/update-user-agency',
    method: 'post',
    data,
  });
}

export function callApiGetListRoleAgency() {
  return request({
    url: 'list-role-agency',
    method: 'get',
  });
}
