import request from '../utils/request';

function callApiSignIn(data) {
  return request({
    url: 'login',
    method: 'post',
    data,
  });
}

export default callApiSignIn;
