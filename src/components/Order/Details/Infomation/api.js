import request from '@/utils/request';

export function callGetApiChangeTypeOrder(orderId) {
  return request({
    url: `admin/orders/${orderId}/change-source`,
    method: 'put',
  });
}

export function callPostApiChangeTicketStatus(orderId) {
  return request({
    url: `orders/${orderId}/ticket-status`,
    method: 'post',
  });
}
