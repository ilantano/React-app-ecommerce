import list from './list';
import agencies from './agency';

export default function mockOrder(mock) {
  // Mock chặn URL ...summary-report để trả về dữ liệu giả theo phương thức GET
  mock
    .onGet(
      `${process.env.REACT_APP_URL}admin/summary-report?agencyId=0&date=15/07/2021`,
    )
    .reply(() => {
      return [200, list];
    });
  // Mock chặn URL ...summary/agencies để trả về dữ liệu giả theo phương thức GET
  mock.onGet(`${process.env.REACT_APP_URL}admin/summary/agencies`).reply(() => {
    return [200, agencies];
  });
}
