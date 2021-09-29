import moment from 'moment';
/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File dữ liệu giả cho danh sách trả thưởng
Version: 1.0
Created: 08h 10p 12/07/2021
*/
const faker = require('faker/locale/vi');

const typeProduct = ['Power 6/36', 'VietLot 6/45', 'Lô tô 6/36'];
const typeStatus = ['Chưa trả thưởng', 'Đã trả thưởng'];
const generate = (max) => {
  const arr = [];
  for (let index = 0; index < max; index += 1) {
    const status = faker.datatype.number(1);
    arr.push({
      customerName: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumber(),
      productName: typeProduct[faker.datatype.number(2)],
      numberPrize: `${faker.datatype.number(99)}-${faker.datatype.number(
        99,
      )}-${faker.datatype.number(99)}-${faker.datatype.number(
        99,
      )}-${faker.datatype.number(99)}-${faker.datatype.number(99)}`,
      time: `#${faker.datatype.number(9999)} ${moment().format('L')}`,
      value: (faker.datatype.number(1000) + 1) * 1000000,
      payer: faker.name.findName(),
      status,
      statusName: typeStatus[status],
    });
  }
  return arr;
};

export default {
  page: 5,
  resource: generate(10),
  total: 43,
};
