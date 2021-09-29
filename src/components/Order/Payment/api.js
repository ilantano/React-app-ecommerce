import request from '@/utils/request';

export function callGetApiPaymentTypes() {
  return request({
    url: 'admin/payment/types',
    method: 'get',
  });
}

export function callGetApiPaymentExtras() {
  return request({
    url: 'admin/payment/extras',
    method: 'get',
  });
}

export function callPostApiPayment(data) {
  return request({
    url: `admin/orders/${data?.orderId}/payments`,
    method: 'post',
    data: data.dataPayment,
  });
}

export function callPutApiPayment(data) {
  return request({
    url: `admin/orders/${data?.orderId}/payments`,
    method: 'put',
    data: data.dataPayment,
  });
}

export function callDeleteApiPaymentExtras(data) {
  return request({
    url: `admin/orders/${data?.orderId}/payments/${data?.paymentId}`,
    method: 'delete',
  });
}

export function callPostApiPaymentOverAmount(data) {
  return request({
    url: `admin/orders/${data?.orderId}/payment/over-amount`,
    method: 'post',
    data,
  });
}
