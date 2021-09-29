import request from '../utils/request';

export function callApiGetDashBoardInformation(
  { pageNo, pageSize },
  currentFilter,
) {
  return request({
    url: `dashboard?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'post',
    data: currentFilter,
  });
}

export function callApiGetCustomerDetail(customerId) {
  return request({
    url: `details?id=${customerId}`,
    method: 'get',
  });
}
