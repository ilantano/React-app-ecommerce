const faker = require('faker/locale/vi');

const generate = (max) => {
  const arr = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < max; index++) {
    arr.push({
      endDate: new Date().getTime(),
      product: faker.name.findName(),
      startDate: new Date().getTime(),
    });
  }
  return arr;
};

export default {
  page: 5,
  resource: generate(10),
  total: 43,
};
