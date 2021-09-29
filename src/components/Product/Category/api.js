import request from '@/utils/request';

export function callPostApiStopDraw(data) {
  return request({
    url: 'stop-draw',
    method: 'post',
    data,
  });
}

export function callGetApiDrawSchedule() {
  return request({
    url: 'draw-schedule',
    method: 'get',
  });
}
