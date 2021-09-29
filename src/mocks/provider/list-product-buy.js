import moment from 'moment';
/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File dữ liệu giả cho danh sách vé bán ra
Version: 1.0
Created: 08h 10p 12/07/2021
*/
const faker = require('faker/locale/vi');

const generate = (max) => {
  const arr = [];
  for (let index = 0; index < max; index += 1) {
    arr.push({
      fromdate: `${moment(faker.date.past()).format('DD/MM/YYYY')}`,
      todate: `${moment(faker.date.future()).format('DD/MM/YYYY')}`,
      begin: faker.datatype.number(9999),
      end: faker.datatype.number(9999),
    });
  }
  return arr;
};

export default {
  page: 5,
  resource: generate(10),
  total: 43,
};
