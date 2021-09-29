import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import moment from 'moment';
import {
  callApiGetListListStatusOrders,
  callApiGetListStatusTicket,
} from '@/api/managerOrder';
import MultipleSelect from '../../Core/Filter/MultipleSelect';
import DatePicker from '../../Core/Filter/DatePicker';
import KeywordInput from '../../Core/Filter/KeywordInput';
import FilterButton from '../../Core/Filter/FilterButton';
import { setDataGetListProducts, OPTION_KEY } from '../helper';

const FilterOrder = ({ changeFilter, getChildData }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const startTime = moment(values.dateRange?.[0]).format('L');
    const endTime = moment(values.dateRange?.[1]).format('L');

    const startDate = values.dateRange ? startTime : '';
    const endDate = values.dateRange ? endTime : '';
    const data = setDataGetListProducts({ ...values, startDate, endDate });
    getChildData(data);
    changeFilter(data);
  };

  return (
    <Form onFinish={onFinish} form={form} layout='vertical'>
      <Row gutter={30} className='mb-4'>
        <Col lg={5} md={24} sm={24} className='mb-4 lg:mb-0'>
          <MultipleSelect
            getListOption={callApiGetListListStatusOrders}
            form={form}
            label='Thanh toán'
            placeholder='Thêm trạng thái đơn hàng'
            name='statusOrderId'
            optionKey={OPTION_KEY}
          />
        </Col>
        <Col lg={5} md={24} sm={24} className='mb-4 lg:mb-0'>
          {/* <FilterProvider form={form} /> */}
          <MultipleSelect
            getListOption={callApiGetListStatusTicket}
            form={form}
            placeholder='Thêm trạng thái vé'
            label='Trạng thái vé'
            name='statusTicketId'
            optionKey={OPTION_KEY}
          />
        </Col>
        <Col lg={6} md={24} sm={24}>
          <DatePicker label='Ngày tạo' />
        </Col>
        <Col lg={5} md={24} sm={24} className='mb-4 lg:mb-0'>
          <KeywordInput
            name='keyWord'
            label='Từ khóa'
            placeholder='Mã đơn hàng / Tên / SĐT'
          />
        </Col>
        <Col lg={1} md={24} sm={24} className='flex items-end'>
          <FilterButton />
        </Col>
      </Row>
    </Form>
  );
};

export default FilterOrder;
FilterOrder.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  getChildData: PropTypes.func.isRequired,
};
