import request from '../utils/request';

export function callApiGetListStatus() {
  return request({
    url: 'status-product-agency',
    method: 'get',
  });
}

export function callApiGetListProviderAgency() {
  return request({
    url: 'provider-agency',
    method: 'get',
  });
}

export function callApiGetListProductAgency(data) {
  return request({
    url: 'list-product-agency',
    method: 'post',
    data,
  });
}

export function callApiActionProductAgency(params) {
  return request({
    url: 'action-product-agency',
    method: 'post',
    params,
  });
}

export function callApiGetListSectionProductAgency(params) {
  return request({
    url: 'list-section-product-agency',
    method: 'get',
    params,
  });
}

export function callApiUpdateImageProductAgency(data) {
  return request({
    url: 'upload-image',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function callApiUpdateProductAgency(data) {
  return request({
    url: 'update-product-agency',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function callApiUpdateProductSectionAgency(data) {
  return request({
    url: 'update-product-section-agency',
    method: 'post',
    data,
  });
}

export function callApiGetListProduct() {
  return request({
    url: 'list-product',
    method: 'get',
  });
}
export function callApiSchedulingTypeAgency() {
  return request({
    url: 'scheduling-type-agency',
    method: 'get',
  });
}

export function callApiActionProductSectionAgency(params) {
  return request({
    url: 'action-product-section-agency',
    method: 'post',
    params,
  });
}
