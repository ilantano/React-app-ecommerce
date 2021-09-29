import request from '@/utils/request';

export default function callApiGetListAgencys() {
  return request({
    url: '/agency/list-agency-by-user',
    method: 'get',
  });
}
