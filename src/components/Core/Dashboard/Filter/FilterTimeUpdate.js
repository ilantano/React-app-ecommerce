import { Checkbox, ConfigProvider, DatePicker } from 'antd';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

export default function FilterTimeUpdate({
  handleChangeTimeUpdate,
  isReset,
  cancelReset,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [rangeDate, setRangeDate] = useState([]);

  useEffect(() => {
    if (isChecked) {
      return handleChangeTimeUpdate({
        startDate: get(rangeDate, '[0]')
          ? get(rangeDate, '[0]').format('YYYY-MM-DD')
          : '',
        endDate: get(rangeDate, '[1]')
          ? get(rangeDate, '[1]').format('YYYY-MM-DD')
          : '',
      });
    }
    handleChangeTimeUpdate({ startDate: '', endDate: '' });
    return null;
  }, [isChecked, rangeDate]);

  useEffect(() => {
    if (isReset) {
      setIsChecked(false);
      setRangeDate([]);
      cancelReset();
    }
  }, [isReset]);

  const handleChangeTime = (event) => {
    setRangeDate(event);
  };

  const handleChangeCheckbox = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='time'>
      <Checkbox
        onChange={handleChangeCheckbox}
        className='time__checkbox'
        checked={isChecked}
        id='checkbox'
      />
      <span>Thời gian cập nhật</span>
      <div className='time-range-picker__title'>
        <div className='time-range-picker__title--start-time'>Từ ngày:</div>
        <div className='time-range-picker__title--end-time'>Đến ngày:</div>
      </div>
      <ConfigProvider>
        <RangePicker
          locale={locale}
          bordered={false}
          placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
          onChange={handleChangeTime}
          className='time-range-picker'
          value={rangeDate}
        />
      </ConfigProvider>
    </div>
  );
}

FilterTimeUpdate.propTypes = {
  handleChangeTimeUpdate: PropTypes.func.isRequired,
  isReset: PropTypes.bool.isRequired,
  cancelReset: PropTypes.func.isRequired,
};
