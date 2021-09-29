import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Slider } from 'antd';

export default function FilterRangeAge({
  handleChangeAgeRange,
  isReset,
  cancelReset,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [rangeAgeValue, setRangeAgeValue] = useState([1, 150]);

  useEffect(() => {
    if (isChecked) {
      return handleChangeAgeRange({
        startAge: rangeAgeValue[0],
        endAge: rangeAgeValue[1],
      });
    }
    handleChangeAgeRange({
      startAge: 1,
      endAge: 150,
    });
    return null;
  }, [rangeAgeValue, isChecked]);

  useEffect(() => {
    if (isReset) {
      setIsChecked(false);
      setRangeAgeValue([1, 150]);
      cancelReset();
    }
  }, [isReset]);

  const handleChangeRangeAge = (rangeValue) => {
    setRangeAgeValue(rangeValue);
  };

  const handleChangeCheckbox = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='age'>
      <Checkbox
        onChange={handleChangeCheckbox}
        className='age__checkbox'
        checked={isChecked}
        id='checkbox'
      />
      <span className='age__title'>Độ tuổi:</span>
      <span className='age__number'>{`${rangeAgeValue[0]} - ${rangeAgeValue[1]}`}</span>
      <div className='age__slider'>
        <span className='age__slider--prefix'>1</span>
        <Slider
          range
          min={1}
          max={150}
          value={rangeAgeValue}
          className='age__slider--center'
          onChange={handleChangeRangeAge}
        />
        <span className='age__slider--suffix'>150</span>
      </div>
    </div>
  );
}

FilterRangeAge.propTypes = {
  handleChangeAgeRange: PropTypes.func.isRequired,
  isReset: PropTypes.bool.isRequired,
  cancelReset: PropTypes.func.isRequired,
};
