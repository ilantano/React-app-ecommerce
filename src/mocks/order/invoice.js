const invoice = {
  nameAgency: 'Linh-Nam',
  orderId: '060721001201',
  printTime: '08/07/2021 -16:30',
  nameCustomer: 'A Hung',
  customerPhone: '0989668669',
  printer: 'Nhân Viên Lĩnh Nam',
  customerKeeps: [
    {
      product: 'XSTT',
      quantity: 10,
      totalMoney: 100000,
    },
    {
      product: 'Điện Toán',
      quantity: 10,
      totalMoney: 150000,
    },
  ],
  agencyKeeps: [
    {
      categoryName: 'Dien-toan',
      subProductResponseList: [
        {
          productName: '6/36',
          playStyle: 'Vé đơn',
          valueNumber: '02-25-09-07-05-06',
          seri: null,
          discount: 12,
          periodDateList: [
            {
              id: '',
              date: '24/05/2021',
              code: '#7855',
            },
            {
              id: '',
              date: '26/05/2021',
              code: '#7854',
            },
          ],
          totalMoney: 200,
          price: 100,
          unit: 'cặp',
        },
        {
          productName: '6/36',
          playStyle: 'Vé đơn',
          valueNumber: '02-25-09-07-12-33',
          seri: null,
          discount: 0,
          periodDateList: [
            {
              id: '',
              date: '24/05/2021',
              code: '#7955',
            },
            {
              id: '',
              date: '26/05/2021',
              code: '#7894',
            },
          ],
          totalMoney: 2200,
          price: 1200,
          unit: 'số',
        },
      ],
    },
  ],
  totalBill: 100200,
  discountMoney: 0,
  awardTicket: 200,
  transfer: 100,
  deductionInvoice: 100,
  intoMoney: 99800,
};
export default invoice;
