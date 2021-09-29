import request from '@/utils/request';

const { REACT_APP_USE_MOCK_DATA } = process.env;
export function callGetApiISummaryReport(data) {
  if (REACT_APP_USE_MOCK_DATA === 'true') {
    // eslint-disable-next-line no-param-reassign
    data = {
      agencyId: 0,
      date: '15/07/2021',
    };
  }
  return request({
    url: `admin/summary-report?agencyId=${data.agencyId}&date=${data.date}`,
    method: 'get',
  });
}

export function callGetApiISummaryAgencies() {
  return request({
    url: 'admin/summary/agencies',
    method: 'get',
  });
}
