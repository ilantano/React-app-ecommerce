/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: File cấu hình cài đặt và khai báo các mock data được sử dụng trong project
Version: 1.0
Created: 08h 55p 07/07/2021
*/
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockOrder from './order';
import mockProduct from './product';
import mockProvider from './provider';
import mockReward from './reward';
import mockUser from './user';
import mockSynthetic from './synthetic';

export default function mockAxios() {
  const mock = new MockAdapter(axios, { delayResponse: 300 });
  mockOrder(mock);
  mockProduct(mock);
  mockUser(mock);
  mockReward(mock);
  mockSynthetic(mock);
  mockProvider(mock);
  return mock;
}
