import request from '../utils/request';

export function callApiGetListOrder(data) {
  return request({
    url: 'admin/orders',
    method: 'post',
    data,
  });
}

export function callApiGetListListStatusOrders() {
  return request({
    url: 'admin/orders/status',
    method: 'get',
  });
}

export function callApiGetListStatusTicket() {
  return request({
    url: 'admin/orders/tickets/status',
    method: 'get',
  });
}
