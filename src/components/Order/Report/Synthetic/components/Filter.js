import React, { useState, useEffect } from 'react';
import { Form, Row, Col, DatePicker, Select } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import { DATE_FORMAT } from '@/utils/format';
import { setDataGetListSynthetic } from '@/pages/sales/report/synthetic/helper';
import { callGetApiISummaryAgencies } from '@/pages/sales/report/synthetic/api';
import HANDLE_ERROR from '@/utils/handleError';
import FilterButton from '../../../../Core/Filter/FilterButton';

const Filter = ({ getDataSynthetic }) => {
  const [form] = Form.useForm();

  const [dataAgency, setDataAgency] = useState([]);
  const agencyId = getLocalStorage(LOCAL_STORAGE_KEY.AGENCY_ID);

  const onFinish = async () => {
    const data = setDataGetListSynthetic({
      agencyId: form.getFieldsValue().agency || agencyId,
      date: moment(form.getFieldsValue().date).format('L'),
    });
    getDataSynthetic({ ...data });
  };

  useEffect(async () => {
    try {
      const result = await callGetApiISummaryAgencies();
      setDataAgency(result?.data);
      form.setFieldsValue({
        agency: result?.data?.find((item) => item.id === parseInt(agencyId, 10))
          ?.id,
        date: moment(),
      });
    } catch (error) {
      HANDLE_ERROR(error);
    }
  }, []);

  return (
    <Form onFinish={onFinish} form={form} layout='vertical'>
      <div className='flex justify-between'>
        <Row gutter={30} className='mb-4 xl:w-4/5 2xl:w-3/5 w-full'>
          <Col span={10} className='mb-4 lg:mb-0'>
            <Form.Item name='agency' label='Đại lý'>
              <Select>
                {dataAgency?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={10} className='mb-4 lg:mb-0'>
            <Form.Item label='Thời gian' name='date' className='mb-4'>
              <DatePicker
                className='w-full'
                format={DATE_FORMAT.DAY_MONTH_YEAR}
                placeholder={['Thời gian']}
                disabledDate={(current) => current >= moment().add('days')}
              />
            </Form.Item>
          </Col>
          <Col sm={4} lg={2} className='flex w-full items-end mb-4 lg:mb-0'>
            <div className='w-4/5'>
              <FilterButton />
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default Filter;

Filter.propTypes = {
  getDataSynthetic: PropTypes.func.isRequired,
};
