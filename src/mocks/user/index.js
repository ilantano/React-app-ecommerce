/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File cấu hình các phương thức kết nối API được chặn lại bởi Mock và trả về giá trị chủ động
Version: 1.0
Created: 08h 40p 09/07/2021
*/

export default function mockUser(mock) {
  // Mock chặn URL ...login để trả về thông tin tài khoản đang đăng nhập
  mock.onPost(`${process.env.REACT_APP_URL}login`).reply(() => {
    return [
      200,
      {
        username: 'Nguyen Quang Vinh',
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwOTc0MzUzNDgxIiwiQXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImV4cCI6MTYyNTk2ODA5MSwiaWF0IjoxNjI1Nzk1MjkxfQ.k3nuUw-oZzwbMbUMgoGnkvaX_GoYAUF_q3k5kEfSZDd32tiPwSZSBnTl1GEVoUyJn3QWXQFm3erWdrrxde_l1Q',
        role: [{ authority: 'ROLE_ADMIN' }],
      },
    ];
  });
}
