import request from '@/utils/request';

export function callGetApiInvoiceOrder(orderId) {
  return request({
    url: `orders/${orderId}/invoice?isPrint=true`,
    method: 'get',
  });
}

export function callGetLinkCreateOrder() {
  return request({
    url: 'admin/orders',
    method: 'get',
  });
}
