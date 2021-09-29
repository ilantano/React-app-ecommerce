import request from '../utils/request';

export function callApiGetListPackageProduct(data) {
  return request({
    url: '/provider/list-product-package',
    method: 'post',
    data,
  });
}

export function callApiGetListStatusOfPackage() {
  return request({
    url: '/provider/list-promotion-status',
    method: 'get',
  });
}

export function callApiGetListProductOfPackage() {
  return request({
    url: '/provider/list-product',
    method: 'get',
  });
}

export function callApiGetListProductInsertOfPackage() {
  return request({
    url: '/provider/products',
    method: 'get',
  });
}

export function callApiChangeProductOfPackageStatus(data) {
  return request({
    url: '/provider/package-action',
    method: 'post',
    data,
  });
}

export function callApiAddPackageProduct(data) {
  return request({
    url: '/provider/product-package',
    method: 'post',
    data,
  });
}

export function callApiGetListProduct() {
  return request({
    url: '/provider/product/1',
    method: 'get',
  });
}

export function callApiChangePackageProduct(data) {
  return request({
    url: '/provider/package',
    method: 'post',
    data,
  });
}
