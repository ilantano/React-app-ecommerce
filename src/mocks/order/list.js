import moment from 'moment';
import {
  STATUS_PAYMENT,
  STATUS_TICKET,
} from '../../constants/listProductContants';
/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File dữ liệu giả cho danh sách đơn hàng.
Version: 1.0
Created: 08h 50p 07/07/2021
*/
const faker = require('faker/locale/vi');

const generate = (max) => {
  const arr = [];
  for (let index = 0; index < max; index += 1) {
    const indexps = faker.datatype.number(4);
    const indexts = faker.datatype.number(4);
    const paymentStatus = STATUS_PAYMENT[indexps > 0 ? indexps : 1].title;
    const ticketStatus = STATUS_TICKET[indexts > 0 ? indexts : 1].title;
    arr.push({
      orderId: (
        faker.datatype.number(9999) + faker.random.alpha(6)
      ).toUpperCase(),
      totalAmount: faker.datatype.number(100) * 1000000,
      paymentStatus,
      ticketStatus,
      customerName: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumber(),
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
