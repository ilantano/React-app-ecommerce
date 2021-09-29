import moment from 'moment';
/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File dữ liệu giả cho danh sách trả thưởng
Version: 1.0
Created: 08h 10p 12/07/2021
*/
const faker = require('faker/locale/vi');

const typeProduct = ['Power 6/36', 'VietLot 6/45', 'Lô tô 6/36'];
const generate = (max) => {
  const arr = [];
  for (let index = 0; index < max; index += 1) {
    arr.push({
      rewardId: faker.datatype.number(9999),
      productName: typeProduct[faker.datatype.number(2)],
      time: `#${faker.datatype.number(9999)} ${moment().format('L')}`,
      authorUpdate: `${faker.name.findName()} - ${faker.phone.phoneNumber()}`,
      authorAccept: `${faker.name.findName()} - ${faker.phone.phoneNumber()}`,
      createdDate: moment().format('L'),
      createdTime: moment().format('h:mm'),
    });
  }
  return arr;
};

export default {
  page: 5,
  resource: generate(10),
  total: 43,
};
