/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File cấu hình các phương thức kết nối API được chặn lại bởi Mock và trả về giá trị chủ động
Version: 1.0
Created: 08h 32p 14/07/2021
*/
import listBuy from './list-product-buy';
import listProvider from './list-product-provider';

export default function mockProvider(mock) {
  mock
    .onPost(`${process.env.REACT_APP_URL}provider/list-product-buy`)
    .reply(() => {
      return [200, listBuy];
    });

  mock
    .onPost(`${process.env.REACT_APP_URL}provider/list-product-provider`)
    .reply(() => {
      return [200, listProvider];
    });
}
