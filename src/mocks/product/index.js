/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File cấu hình các phương thức kết nối API được chặn lại bởi Mock và trả về giá trị chủ động
Version: 1.0
Created: 08h 50p 07/07/2021
*/
import list from './list';
import categoryStopDraw from './categoryStopDraw';

export default function mockProduct(mock) {
  // Mock chặn URL ...products để trả về danh sách có phân trang dữ liệu giả theo phương thức GET
  mock.onGet(`${process.env.REACT_APP_URL}products`).reply(() => {
    return [200, list];
  });
  // Mock chặn URL ...products để trả về chi tiết sản phẩm dữ liệu giả theo phương thức GET
  mock.onGet(`${process.env.REACT_APP_URL}products-detail/123`).reply(() => {
    return [200, {}];
  });

  mock.onPost(`${process.env.REACT_APP_URL}stop-draw`).reply(() => {
    return [200, categoryStopDraw];
  });
}
