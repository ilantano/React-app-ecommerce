import request from '../utils/request';

export function callApiGetListPackageStatistical(data) {
  return request({
    url: '/provider/product-package-statistical',
    method: 'post',
    data,
  });
}

export function callApiGetListProductOfAgency(data) {
  return request({
    url: '/provider/product-package-statistical/detail',
    method: 'post',
    data,
  });
}

export function callApiGetListProduct(params) {
  return request({
    url: 'provider/dropdown-product-statistical',
    method: 'get',
    params,
  });
}

export function callApiGetListStatus() {
  return request({
    url: 'provider/dropdown-status-statistical',
    method: 'get',
  });
}
