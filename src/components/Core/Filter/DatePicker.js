import { DatePicker, Form } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import 'moment/locale/vi';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { DATE_FORMAT } from '@/utils/format';

const { Item } = Form;
const { RangePicker } = DatePicker;

function OrderDatePicker({ label }) {
  return (
    <Item name='dateRange' label={label} className='mb-4'>
      <RangePicker
        locale={locale}
        format={DATE_FORMAT.DAY_MONTH_YEAR}
        placeholder={['Từ ngày', 'Đến ngày']}
        disabledDate={(current) => current >= moment().add('days')}
      />
    </Item>
  );
}

export default OrderDatePicker;

OrderDatePicker.propTypes = {
  label: PropTypes.string,
};

OrderDatePicker.defaultProps = {
  label: '',
};
