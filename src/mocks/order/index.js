/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File cấu hình các phương thức kết nối API được chặn lại bởi Mock và trả về giá trị chủ động
Version: 1.0
Created: 08h 50p 07/07/2021
*/
import list from './list';
import datainvoice from './invoice';

export default function mockOrder(mock) {
  // Mock chặn URL ...admin/orders để trả về dữ liệu giả theo phương thức POST
  mock.onPost(`${process.env.REACT_APP_URL}admin/orders`).reply(() => {
    return [200, list];
  });
  // Mock chặn URL ...invoice để trả về chi tiết sản phẩm dữ liệu giả theo phương thức GET
  mock
    .onGet(`${process.env.REACT_APP_URL}orders/120721000059/invoice`)
    .reply(() => {
      return [200, datainvoice];
    });
}
