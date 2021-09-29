export const ROLES = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER',
};

export const ROUTER_ROADMAP = {
  DASHBOARD: '/dashboard',
  SELL: {
    REPORT: '/ban-hang/bao-cao',
    ORDER: {
      ORDER: 'ban-hang/don-hang/danh-sach-don-hang',
      LIST: {
        DETAILS: '/ban-hang/don-hang/danh-sach-don-hang/chi-tiet',
      },
    },
  },
  MENU: [
    [
      {
        path: 'don-hang',
        title: 'Đơn hàng',
      },
      {
        path: 'tra-thuong',
        title: 'Trả thưởng',
      },
      {
        path: 'bao-cao',
        title: 'Báo cáo',
      },
    ],
    [
      {
        path: 'phan-phoi-ve',
        title: 'Phân phối vé',
      },
      {
        path: 'danh-muc-san-pham',
        title: 'Danh mục sản phẩm',
      },
    ],
  ],
  CUSTOMER: {
    USERS: '/khach-hang/khach-hang-than-thiet',
  },
  SIGNIN: '/dang-nhap',
  FORGOT_PASSWORD: '/quen-mat-khau',
  CHANGE_PASSWORD: 'dashboard/profile/dat-lai-mat-khau',
  AGENCYS: '/other/agencys',
};
