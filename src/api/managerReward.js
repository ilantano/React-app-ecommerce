import request from '../utils/request';

export function callApiGetListPrizeResult(data) {
  return request({
    url: 'admin/prize-result',
    method: 'post',
    data,
  });
}

export function callApiGetListWinners(data) {
  return request({
    url: 'admin/winners',
    method: 'post',
    data,
  });
}
