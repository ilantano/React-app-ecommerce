import { Form, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

const { Item } = Form;
const { Option } = Select;
export default function DiscountCode({
  form,
  name,
  listOptions,
  handleChangeSeriTraditional,
}) {
  const VALUE_SELECT_ALL = '';
  const listOption = listOptions;
  const [selectedList, setSelectedList] = useState(['']);

  const orderProviderRef = useRef(null);

  const onSelect = (value) => {
    const newSelectedList = selectedList.filter(
      (agency) => agency !== VALUE_SELECT_ALL,
    );
    if (
      value !== VALUE_SELECT_ALL &&
      newSelectedList.length + 1 < listOption.length
    ) {
      form.setFieldsValue({ [name]: [...newSelectedList, value] });
      return setSelectedList([...newSelectedList, value]);
    }
    setSelectedList([VALUE_SELECT_ALL]);
    return form.setFieldsValue({ [name]: VALUE_SELECT_ALL });
  };

  const handleDeSelect = (value) => {
    setSelectedList(selectedList.filter((item) => item !== value));
  };

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const handleChangeIdTraditional = (value) => {
    handleChangeSeriTraditional(value.filter((item) => item !== ''));
  };

  return (
    <Item name={name}>
      <Select
        mode='multiple'
        placeholder='Thêm trạng thái'
        optionLabelProp='label'
        ref={orderProviderRef}
        showAction={['focus']}
        onSelect={onSelect}
        onDeselect={handleDeSelect}
        defaultValue=''
        value={selectedList}
        filterOption={filterOption}
        dropdownClassName='filter'
        maxTagCount='responsive'
        onChange={handleChangeIdTraditional}
        id='setectStatus'
      >
        <Option value='' label='Tất cả'>
          Tất cả
        </Option>
        {listOption?.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Item>
  );
}

DiscountCode.propTypes = {
  form: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  listOptions: PropTypes.array.isRequired,
  handleChangeSeriTraditional: PropTypes.func.isRequired,
};
