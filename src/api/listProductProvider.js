import request from '../utils/request';

export function callApiGetListProductBuy(data) {
  return request({
    url: '/provider/list-product-buy',
    method: 'post',
    data,
  });
}

export function callApiGetListProductProvider(data) {
  return request({
    url: '/provider/list-product-provider',
    method: 'post',
    data,
  });
}

export function callApiChangeStatusProduct(data) {
  return request({
    url: '/provider/product-status',
    method: 'post',
    data,
  });
}

export function callApiGetDetailProduct(data) {
  return request({
    url: '/provider/product-detail',
    method: 'post',
    data,
  });
}

export function callApiAddNewProduct(data) {
  return request({
    url: '/provider/product',
    method: 'post',
    data,
  });
}

export function callApiGetProductDetail(data) {
  return request({
    url: '/provider/product-detail',
    method: 'post',
    data,
  });
}

export function callApiCreateProductSection(data) {
  return request({
    url: '/provider/product-section',
    method: 'post',
    data,
  });
}

export function callApiUpdateProductSection(data) {
  return request({
    url: '/provider/product-section-name',
    method: 'post',
    data,
  });
}
