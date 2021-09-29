import { shallow } from 'enzyme';
import React from 'react';
import { Form } from 'antd';

import DatePicker from './DatePicker';
import KeywordInput from './KeywordInput';
import ProductSelect from './ProductSelect';
import StatusSelect from './StatusSelect';

const { Item } = Form;

describe('Test filter order component', () => {
  it('should render datepicker', () => {
    const wrapper = shallow(<DatePicker />);
    expect(wrapper.find(Item).length).toEqual(1);
  });
  it('should render keyword', () => {
    const wrapper = shallow(<KeywordInput />);
    expect(wrapper.find(Item).length).toEqual(1);
  });
  it('should render product', () => {
    const wrapper = shallow(<ProductSelect />);
    expect(wrapper.find('.filter__top--text').text()).toEqual('Thêm sản phẩm');
  });
  it('should render status', () => {
    const wrapper = shallow(<StatusSelect />);
    expect(wrapper.find('.filter__top--text').text()).toEqual(
      'Thêm trạng thái',
    );
  });
});
