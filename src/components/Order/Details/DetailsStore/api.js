import request from '@/utils/request';

export function callGetApiAdminOrder(orderId) {
  return request({
    url: `admin/orders/${orderId}/payments`,
    method: 'get',
  });
}
export function callApiGetDetailOrder(orderId) {
  return request({
    url: `admin/orders/${orderId}/items`,
    method: 'get',
  });
}
export function callApiDeleteDetailOrder(orderId) {
  return request({
    url: `admin/order/items/${orderId}`,
    method: 'delete',
  });
}
export function callApiUpdateDetailOrder(orderId, data) {
  return request({
    url: `admin/order/items/${orderId}?keepTicket=${data?.keepTicket}&printed=${data?.printed}&cancelTickets=${data?.cancelTickets}`,
    method: 'put',
  });
}
export function callApiGetSendZalo() {
  return request({
    url: 'send-zalo',
    method: 'get',
  });
}
