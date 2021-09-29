import request from '../utils/request';

function callApiPutChangePassword(data) {
  return request({
    url: '/user/change-password',
    method: 'put',
    data,
  });
}

export default callApiPutChangePassword;
