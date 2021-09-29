import request from '../utils/request';

export function callApiGetListPromotionCode(data) {
  return request({
    url: 'provider/promotion',
    method: 'post',
    data,
  });
}

export function callApiGetListPromotionType() {
  return request({
    url: 'list-promotion-code-type',
    method: 'get',
  });
}

export function callApiGetListPromotionStatus() {
  return request({
    url: 'provider/list-promotion-status',
    method: 'get',
  });
}

export function callApiGetListCurrency() {
  return request({
    url: 'provider/list-currency',
    method: 'get',
  });
}

export function callApiGetPromotionType() {
  return request({
    url: 'provider/list-promotion-type',
    method: 'get',
  });
}

export function callApiAddNewPromotionCode(data) {
  return request({
    url: 'provider/promotion-code',
    method: 'post',
    data,
  });
}

export function callApiChangeActionPromotionCode(data) {
  return request({
    url: 'provider/promotion-action',
    method: 'post',
    data,
  });
}
