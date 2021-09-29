export const dataDetails = [
  {
    id: 1,
    codeTerms: '#775',
    dateOpen: '31/12/2021',
    keeped: '10/15',
    store: '150 Lĩnh Nam',
    series: '1DA-5DA, 10DA-12DA, 15DA',
  },
  {
    id: 2,
    codeTerms: '#776',
    dateOpen: '01/01/2022',
    keeped: '10/15',
    store: 'Văn phòng',
    series: '1DA-5DA, 10DA-12DA, 15DA',
  },
];
export const dataListDetails = {
  orderId: 'JHFDKJ234',
  orderSource: 'online',
  owningStore: 1,
  paymentStatus: 2,
  ticketStatus: 2,
  customerName: '',
  customerPhone: '01155442254',
  createdDate: 34674321312321,
  createdBy: '',
  creatorPhoneNumber: '0555445512',
  totalAmount: 100000000,
  totalDiscount: 100000,
  totalPaid: 50000,
  products: [
    {
      id: 1,
      category: 'Vietlott',
      product: '6/45',
      playingType: 'Vé thường',
      product_type: 1,
      selectedNumbers: '1-12-13-18-19-54',
      totalDrawingTerms: 6,
      numberOfTickets: 1,
      ticketPrice: 5000,
      totalAmount: 200000,
      processStatus: [
        {
          processId: 1,
          processName: 'Giữ hộ',
          processStatus: true,
        },
        {
          processId: 2,
          processName: 'Đã in',
          processStatus: true,
        },
        {
          processId: 3,
          processName: 'Đã hủy',
          processStatus: false,
        },
      ],
    },
    {
      id: 2,
      category: 'Vietlott',
      product: '6/45',
      playingType: 'Vé thường2',
      product_type: 2,
      selectedNumbers: '1-12-13-18-19-54',
      totalDrawingTerms: 6,
      numberOfTickets: 1,
      ticketPrice: 5000,
      totalAmount: 200000,
      processStatus: [
        {
          processId: 1,
          processName: 'Giữ hộ',
          processStatus: true,
        },
        {
          processId: 2,
          processName: 'Đã in',
          processStatus: true,
        },
        {
          processId: 3,
          processName: 'Đã hủy',
          processStatus: false,
        },
      ],
    },
    {
      id: 3,
      category: 'Vietlott',
      product: '6/45',
      playingType: 'Vé thường3',
      product_type: 3,
      selectedNumbers: '1-12-13-18-19-54',
      totalDrawingTerms: 6,
      numberOfTickets: 1,
      ticketPrice: 5000,
      totalAmount: 200000,
      processStatus: [
        {
          processId: 1,
          processName: 'Giữ hộ',
          processStatus: true,
        },
        {
          processId: 2,
          processName: 'Đã in',
          processStatus: true,
        },
        {
          processId: 3,
          processName: 'Đã hủy',
          processStatus: false,
        },
      ],
    },
  ],
};

export const typeDiscount = {
  LOCAP: '10 - 15% (lô cặp)',
  LODON: '22.500đ (lô đơn)',
};

export const DEFAULT_INFO = {
  phoneNumber: '0867933556',
  location: 'happyluck68.vn',
};
