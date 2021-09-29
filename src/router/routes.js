import React from 'react';
import { ROLES } from './constants';
import CoreLogin from '../pages/sign-in';
import CoreAgencies from '../pages/core/agencies';
import ForgotPasswordPage from '../components/ForgotPassWord/forgotPassword';
import EmailChangePassword from '../components/ChangePassWord/ChangePassword';

import Payment from '../pages/sales/orders/payment';
import SalesOrderAgency from '../pages/sales/orders/agency';
import DetailOrder from '../pages/sales/orders/detail';
// import PrizeResult from '../pages/sales/reward/PrizeResult';
// import Winners from '../pages/sales/reward/Winners';
import SalesReport from '../pages/sales/report';
import SalesSynthetic from '../pages/sales/report/synthetic/index';
import SalesPrizeNumber from '../pages/sales/report/prizeNumber';

// import ProductsProvider from '../pages/products/provider/ProductsProvider';

import IconOrder from '../assets/icon/Core/IconOrder';
import IconSale from '../assets/icon/Core/IconSale';
// import IconProduct from '../assets/icon/Core/IconProduct';
// import IconProvider from '../assets/icon/Core/IconProvider';
// import ProductsBuy from '../pages/products/provider/ProductsBuy';
// import ProductStopDraw from '../pages/products/category/ProductStopDraw';
// import ProductDrawSchedule from '../pages/products/category/ProductDrawSchedule';
// import CustomerFavorites from '../pages/customer/CustomerFavorites';

export const AUTHOR_ROUTERS = [
  {
    path: '/ban-hang',
    name: 'Bán hàng',
    meta: {
      title: 'Bán hàng',
      component: SalesOrderAgency,
      icon: <IconSale />,
      roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
    },
    children: [
      {
        path: '/don-hang',
        name: 'Đơn hàng',
        meta: {
          title: 'Đơn hàng',
          component: SalesOrderAgency,
          icon: <IconOrder />,
          roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
        },
        children: [
          {
            path: '/danh-sach-don-hang',
            name: 'Danh sách đơn hàng',
            meta: {
              title: 'Danh sách đơn hàng',
              component: SalesOrderAgency,
              roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
            },
            children: [
              {
                path: '/chi-tiet/:orderId',
                name: 'Chi tiết đơn hàng',
                meta: {
                  title: 'Chi tiết đơn hàng',
                  component: DetailOrder,
                  roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
                  isHidden: true,
                },
                children: [],
              },
            ],
          },
          {
            path: '/thanh-toan',
            name: 'Thanh toán',
            meta: {
              title: 'Thanh toán',
              component: Payment,
              roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
              isHidden: true,
            },
            children: [],
          },
        ],
      },
      // {
      //   path: '/tra-thuong',
      //   name: 'Trả thưởng',
      //   meta: {
      //     title: 'Trả thưởng',
      //     component: PrizeResult,
      //     icon: <IconOrder />,
      //     roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
      //   },
      //   children: [
      //     {
      //       path: '/ket-qua-quay-thuong',
      //       name: 'Kết quả quay thưởng',
      //       meta: {
      //         title: 'Kết quả quay thưởng',
      //         component: PrizeResult,
      //         roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
      //       },
      //       children: [],
      //     },
      //     {
      //       path: '/danh-sach-trung-thuong',
      //       name: 'Danh sách trúng thưởng',
      //       meta: {
      //         title: 'Danh sách trúng thưởng',
      //         component: Winners,
      //         roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
      //       },
      //       children: [],
      //     },
      //   ],
      // },
      {
        path: '/bao-cao',
        name: 'Báo cáo',
        meta: {
          title: 'Báo cáo',
          component: SalesReport,
          roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
        },
        children: [
          {
            path: '/tong-hop',
            name: 'Tổng hợp',
            meta: {
              title: 'Tổng hợp',
              component: SalesSynthetic,
              roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
            },
            children: [],
          },
          {
            path: '/so-du-thuong',
            name: 'Số dự thưởng',
            meta: {
              title: 'Số dự thưởng',
              component: SalesPrizeNumber,
              roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
            },
            children: [],
          },
        ],
      },
    ],
  },
  // {
  //   path: '/san-pham',
  //   name: 'Sản phẩm',
  //   meta: {
  //     title: 'Sản phẩm',
  //     icon: <IconProduct />,
  //     roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //   },
  //   children: [
  // {
  //   path: '/phan-phoi-ve',
  //   name: 'Phân phối vé',
  //   meta: {
  //     title: 'Phân phối vé',
  //     component: ProductsBuy,
  //     roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //   },
  //   children: [
  //     {
  //       path: '/ve-ban-ra',
  //       name: 'Vé bán ra',
  //       meta: {
  //         title: 'Vé bán ra',
  //         component: ProductsBuy,
  //         roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //       },
  //       children: [],
  //     },
  //     {
  //       path: '/phan-phoi-ve',
  //       name: 'Phân phối vé',
  //       meta: {
  //         title: 'Phân phối vé cho Đại lý',
  //         component: ProductsProvider,
  //         roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //       },
  //       children: [],
  //     },
  //   ],
  // },
  // {
  //   path: '/danh-muc-san-pham',
  //   name: 'Danh mục sản phẩm',
  //   meta: {
  //     title: 'Danh mục sản phẩm',
  //     component: ProductStopDraw,
  //     roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //   },
  //   children: [
  //     {
  //       path: '/nghi-quay-thuong',
  //       name: 'Nghỉ quay thưởng',
  //       meta: {
  //         title: 'Nghỉ quay thưởng',
  //         component: ProductStopDraw,
  //         roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //       },
  //       children: [],
  //     },
  //     {
  //       path: '/lich-quay-thuong',
  //       name: 'Lịch quay thưởng',
  //       meta: {
  //         title: 'Lịch quay thưởng',
  //         component: ProductDrawSchedule,
  //         roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //       },
  //       children: [],
  //     },
  //   ],
  // },
  //   ],
  // },
  // {
  //   path: '/khach-hang',
  //   name: 'Khách hàng',
  //   meta: {
  //     title: 'Khách hàng',
  //     icon: <IconProvider />,
  //     roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //   },
  //   children: [
  //     {
  //       path: '/khach-hang-than-thiet',
  //       name: 'AdminProviderUser',
  //       meta: {
  //         title: 'Khách hàng thân thiết',
  //         component: CustomerFavorites,
  //         roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //       },
  //       children: [
  //         {
  //           path: '/khach-hang-than-thiet',
  //           name: 'AdminProviderUser',
  //           meta: {
  //             title: 'Danh sách khách hàng',
  //             component: CustomerFavorites,
  //             roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER],
  //           },
  //           children: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const NOT_AUTHOR_ROUTER = [
  {
    path: '/',
    name: 'Sign in',
    meta: {
      title: 'Đăng nhập',
      component: CoreLogin,
    },
  },
  {
    path: '/dang-nhap',
    name: 'Sign in',
    meta: {
      title: 'Đăng nhập',
      component: CoreLogin,
    },
  },
  {
    path: '/quen-mat-khau',
    name: 'Forgot Password',
    meta: {
      title: 'Quên mật khẩu',
      component: ForgotPasswordPage,
    },
  },
  {
    path: '/dat-lai-mat-khau',
    name: 'Change Password',
    meta: {
      title: 'Đặt lại mật khẩu',
      component: EmailChangePassword,
    },
  },
];

export const CUSTOMER_ROUTER = [
  {
    path: '/other/agencys',
    name: 'Agencys',
    meta: {
      title: 'Chọn danh sách đại lý',
      component: CoreAgencies,
      roles: [],
    },
    children: [],
  },
];
