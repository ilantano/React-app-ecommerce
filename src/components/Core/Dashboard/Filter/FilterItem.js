import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Select } from 'antd';

const { Option } = Select;
export default function FilterItem({
  optionSelect,
  objectFilter,
  handleChangeFilter,
  isReset,
  cancelReset,
}) {
  const [specificOption, setSpecificOption] = useState(optionSelect);
  const [numberSelected, setNumberSelected] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      return handleChangeFilter({
        [objectFilter.defineNumberName]:
          numberSelected.length > 0 ? numberSelected : [],
      });
    }
    handleChangeFilter({ [objectFilter.defineNumberName]: [] });
    return null;
  }, [numberSelected, isChecked]);

  useEffect(() => {
    if (isReset) {
      setSpecificOption(optionSelect);
      setNumberSelected([]);
      setIsChecked(false);
      cancelReset();
    }
  }, [isReset]);

  const handleChangeOption = (number) => {
    const newSpecificOption = specificOption.filter(
      (item) => item.key !== number,
    );
    setSpecificOption(newSpecificOption);
    setNumberSelected([...numberSelected, +number]);
  };

  const handleChangeSelectedNumber = (number) => {
    /*
    1: input number is number deleted
    2: creat input number option => sort small -> large specific option
    3: delete input number in numberSelected array
    */
    const newSpecificOption = [
      ...specificOption,
      <Option key={number}>{number}</Option>,
    ].sort((smallNumber, largeNumber) => smallNumber.key - largeNumber.key);
    setSpecificOption(newSpecificOption);
    const newSelectedNumber = numberSelected.filter((num) => num !== number);
    setNumberSelected(newSelectedNumber);
  };

  const handleChangeCheckbox = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <Checkbox
        onChange={handleChangeCheckbox}
        checked={isChecked}
        id='checkbox'
      />
      <span>{objectFilter.title}</span>
      <div>
        <Select
          placeholder='Chọn số'
          bordered={false}
          value={null}
          onChange={handleChangeOption}
        >
          {specificOption}
        </Select>
      </div>
      <Select
        mode='multiple'
        open={false}
        showSearch={false}
        onDeselect={handleChangeSelectedNumber}
        bordered={false}
        value={numberSelected}
      />
    </>
  );
}

FilterItem.propTypes = {
  optionSelect: PropTypes.any.isRequired,
  objectFilter: PropTypes.object.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
  isReset: PropTypes.bool.isRequired,
  cancelReset: PropTypes.func.isRequired,
};
