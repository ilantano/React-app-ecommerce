import request from '../utils/request';

export function callApiGetListOrderProduct(params) {
  return request({
    url: 'products',
    method: 'get',
    params,
  });
}

export function callApiGetListOrderStatuses() {
  return request({
    url: `payment-status`,
    method: 'get',
  });
}
export function callApiGetListOrder() {
  return request({
    url: `orders`,
    method: 'get',
  });
}

export function callApPostOrder(data) {
  return request({
    url: `order`,
    method: 'post',
    data,
  });
}

export function callApiGetOrderDetail(params) {
  return request({
    url: `detail/${params.orderId}`,
    method: 'get',
  });
}

export function callApiGetInfoOrder(params) {
  return request({
    url: `detail/${params}`,
    method: 'get',
    params,
  });
}

export function callApiUpdateOrderComment(data) {
  return request({
    url: 'detail',
    method: 'post',
    data,
  });
}

export function callApiGetOrderProductDetail(data) {
  return request({
    url: 'product-detail',
    method: 'post',
    data,
  });
}

export function callApiGetDealDetail(orderId) {
  return request({
    url: `deal-detail/${orderId}`,
    method: 'get',
  });
}

export function callApiGetHistoryProduct(params) {
  return request({
    url: `product-deal-detail`,
    method: 'get',
    params,
  });
}

export function callApiGetListUser() {
  return request({
    url: 'users',
    method: 'get',
  });
}

export function callApiGetListOrderProductBill(data) {
  return request({
    url: 'product-bill',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function callApiGetManualTransactionBill(data) {
  return request({
    url: 'bill',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function callApiGetSendEmail(params) {
  return request({
    url: 'send-email',
    method: 'post',
    params,
  });
}

export function callApiGetDiscountCodeProductApi(params) {
  return request({
    url: 'agency/detail-agency-promotion-code',
    method: 'get',
    params,
  });
}

export function callApiGetListPromotionCode() {
  return request({
    url: 'list-promotion-code-type',
    method: 'get',
  });
}

export function callApiGetListDiscountCodeProduct(data) {
  return request({
    url: 'agency/promotion-code-agency',
    method: 'post',
    data,
  });
}

export function callApiAddDiscountCode(data) {
  return request({
    url: 'agency/add-promotion-code-agency',
    method: 'post',
    data,
  });
}

export function callApiGetListProduct() {
  return request({
    url: 'list-product',
    method: 'get',
  });
}

export function callApiGetListCurrency() {
  return request({
    url: 'provider/list-currency',
    method: 'get',
  });
}

export function callApiActionPromotionCode(params) {
  return request({
    url: 'agency/action-promotion-code-agency',
    method: 'post',
    params,
  });
}

export function callApiGetListPackageContainProduct() {
  return request({
    url: 'agency/list-provider-product',
    method: 'get',
  });
}

export function callApiGetListInformationProduct() {
  return request({
    url: 'list-filter-status',
    method: 'get',
  });
}

export function callApiGetListPurchasedPakage(data) {
  return request({
    url: 'agency/list-provider-order',
    method: 'post',
    data,
  });
}

export function callApiGetListPackageProduct(params) {
  return request({
    url: 'agency/list-package-contain-product',
    method: 'get',
    params,
  });
}

export function callApiGetListInformationProductAgency(params) {
  return request({
    url: 'agency/list-information-product',
    method: 'get',
    params,
  });
}

export function callApiDestroyProviderOrder(params) {
  return request({
    url: 'agency/destroy-provider-order',
    method: 'post',
    params,
  });
}

export function callApiApplyProviderOrder(data) {
  return request({
    url: 'agency/apply-provider-order',
    method: 'post',
    data,
  });
}

export function callApiAddProviderOrder(data) {
  return request({
    url: 'agency/add-provider-order',
    method: 'post',
    data,
  });
}

export function callApiDetailProviderOrder(params) {
  return request({
    url: 'agency/detail-provider-order',
    method: 'get',
    params,
  });
}

export function callApiGetListBank() {
  return request({
    url: 'list-bank',
    method: 'get',
  });
}

export function callApiGetBankDetail(params) {
  return request({
    url: 'bank-detail',
    method: 'get',
    params,
  });
}

export function callApiGetListStatisticalProductPackage(data) {
  return request({
    url: 'agency/list-statistical-product-package',
    method: 'post',
    data,
  });
}

export function callApiCheckPromotionCode(params) {
  return request({
    url: 'agency/check-promotion-code-agency',
    method: 'get',
    params,
  });
}

export function callApiUpdateCustomerOrder(customerId, data) {
  return request({
    url: `/agency/customer/${customerId}`,
    method: 'post',
    data,
  });
}

export function callApiUpdateReceive(customerId, data) {
  return request({
    url: `/agency/delivery-customer/${customerId}`,
    method: 'post',
    data,
  });
}

export function callApiUpdateProductOwnerInfo(customerId, data) {
  return request({
    url: `/agency/customer-acquaintance/${customerId}`,
    method: 'post',
    data,
  });
}
