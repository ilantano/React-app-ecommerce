/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File dữ liệu giả cho danh sách đơn hàng.
Version: 1.0
Created: 08h 50p 07/07/2021
*/
const faker = require('faker/locale/vi');

const generate = (max) => {
  const arr = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < max; index++) {
    arr.push({
      orderId: (
        faker.datatype.number(9999) + faker.random.alpha(6)
      ).toUpperCase(),
      total_amount: faker.datatype.number(100) * 1000000,
      paymentStatus: faker.datatype.number(4),
      ticketStatus: faker.datatype.number(4),
      customerName: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumber(),
      createdDate: new Date().getTime(),
    });
  }
  return arr;
};

export default {
  totalItems: 10,
  data: generate(20),
};
