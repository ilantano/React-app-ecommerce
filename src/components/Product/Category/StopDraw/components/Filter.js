import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import moment from 'moment';
import DatePicker from '../../../../Core/Filter/DatePicker';
import FilterButton from '../../../../Core/Filter/FilterButton';
import MultipleSelect from '../../../../Core/Filter/MultipleSelect';
import { setDataCategoryStopDraw } from '../helper';

const FilterCategoryStopDraw = ({ changeFilter }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const startTime = moment(values.dateRange?.[0]).format('L');
    const endTime = moment(values.dateRange?.[1]).format('L');

    const startDate = values.dateRange ? startTime : '';
    const endDate = values.dateRange ? endTime : '';
    const data = setDataCategoryStopDraw({ ...values, startDate, endDate });
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
          <MultipleSelect
            label='Sản phẩm'
            name='product'
            form={form}
            getListOption={[]}
          />
        </Col>
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

export default FilterCategoryStopDraw;
FilterCategoryStopDraw.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
