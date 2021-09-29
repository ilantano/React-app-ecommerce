/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File cấu hình các phương thức kết nối API được chặn lại bởi Mock và trả về giá trị chủ động
Version: 1.0
Created: 08h 05p 12/07/2021
*/
import listprizeresult from './list-prize-result';
import listwinners from './list-winners';

export default function mockReward(mock) {
  mock.onPost(`${process.env.REACT_APP_URL}admin/prize-result`).reply(() => {
    return [200, listprizeresult];
  });

  mock.onPost(`${process.env.REACT_APP_URL}admin/winners`).reply(() => {
    return [200, listwinners];
  });
}
