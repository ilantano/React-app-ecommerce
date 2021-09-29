import moment from 'moment';
/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File dữ liệu giả cho danh sách phân phối vé
Version: 1.0
Created: 08h 10p 12/07/2021
*/
const faker = require('faker/locale/vi');

const generate = (max) => {
  const arr = [];
  for (let index = 0; index < max; index += 1) {
    arr.push({
      agency_name: faker.company.companyName(),
      agency_address: `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.city()} `,
      date: `${moment(faker.date.past()).format('DD/MM/YYYY')}`,
      total: faker.datatype.number(99999),
    });
  }
  return arr;
};

export default {
  page: 5,
  resource: generate(10),
  total: 43,
};
