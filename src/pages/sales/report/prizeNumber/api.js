import request from '@/utils/request';

export function callGetApiCustomerMenu() {
  return request({
    url: 'customer/menu',
    method: 'get',
  });
}

export function callGetApiProductPlayTypes(params) {
  return request({
    url: `customer/products/play-types?token=${params?.token}`,
    method: 'get',
  });
}
export function callPostApiExport(params) {
  return request({
    url: `export?categoryId=${params?.categoryId}&productId=${params?.productId}&playStyleId=${params?.playStyleId}&agencyId=${params?.agencyId}&date=${params?.date}&playStyleName=${params?.playStyleName}`,
    method: 'get',
  });
}
