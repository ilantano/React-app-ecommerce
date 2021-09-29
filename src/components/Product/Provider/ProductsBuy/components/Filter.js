import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import DatePicker from '../../../../Core/Filter/DatePicker';
import FilterButton from '../../../../Core/Filter/FilterButton';
import { setDataProductsBuy } from '../helper';

const FilterProductsBuy = ({ changeFilter }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const startDate = values.dateRange
      ? new Date(values.dateRange[0]).getTime()
      : '';
    const endDate = values.dateRange
      ? new Date(values.dateRange[1]).getTime()
      : '';
    const data = setDataProductsBuy({ ...values, startDate, endDate });
    changeFilter(data);
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout='vertical'
      style={{ width: '100%' }}
    >
      <Row gutter={30} className='mb-4'>
        <Col lg={6} md={24} sm={24}>
          <DatePicker label='Ngày phân phối' />
        </Col>
        <Col lg={1} md={24} sm={24} className='flex items-end'>
          <FilterButton />
        </Col>
      </Row>
    </Form>
  );
};

export default FilterProductsBuy;
FilterProductsBuy.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
