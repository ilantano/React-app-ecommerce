import request from '@/utils/request';

export function callGetApiListItemDetails(orderId) {
  return request({
    url: `admin/order/items/${orderId}/periods`,
    method: 'get',
  });
}
export function callPutApiUpdateDiscount(orderItemId, data) {
  return request({
    url: `admin/order/items/${orderItemId}/periods/discount`,
    method: 'put',
    data,
  });
}
export function callPutApiUpdateSeriTraditional(orderItemId, data) {
  return request({
    url: `admin/order/items/${orderItemId}/period/seri-ticket`,
    method: 'put',
    data,
  });
}
