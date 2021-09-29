import { Form, Select } from 'antd';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import HANDLE_ERROR from '@/utils/handleError';
import VALUE_SELECT_ALL from './constants';

const { Item } = Form;
const { Option } = Select;

function MultipleSelect({
  form,
  placeholder,
  name,
  label,
  getListOption,
  params,
  optionKey,
  id,
}) {
  const [listOption, setListOption] = useState([]);
  const [selectedList, setSelectedList] = useState(['']);
  const orderProviderRef = useRef(null);

  useEffect(async () => {
    try {
      const results = await getListOption({ agencyId: params });
      if (get(results, 'data')) {
        return setListOption(get(results, 'data'));
      }
      setListOption([]);
    } catch (error) {
      HANDLE_ERROR(error);
    }
    return null;
  }, []);

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

  return (
    <Item name={name} label={label}>
      <Select
        mode='multiple'
        placeholder={placeholder}
        optionLabelProp='label'
        ref={orderProviderRef}
        showAction={['focus']}
        value={selectedList}
        onSelect={onSelect}
        onDeselect={handleDeSelect}
        defaultValue={selectedList}
        filterOption={filterOption}
        dropdownClassName='filter'
        maxTagCount='responsive'
        id={id}
      >
        <Option value='' label='Tất cả'>
          Tất cả
        </Option>
        {listOption.map((option) => (
          <Option
            key={option?.[optionKey.id] ?? option?.[optionKey.productId]}
            label={option?.[optionKey.name] ?? option?.[optionKey.productName]}
            value={option?.[optionKey.id] ?? option?.[optionKey.productId]}
          >
            {option?.[optionKey.name] || option?.[optionKey.productName]}
          </Option>
        ))}
      </Select>
    </Item>
  );
}

export default MultipleSelect;

MultipleSelect.propTypes = {
  form: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  getListOption: PropTypes.func.isRequired,
  params: PropTypes.string,
  optionKey: PropTypes.object,
};

MultipleSelect.defaultProps = {
  placeholder: '',
  label: '',
  params: '',
  optionKey: { id: 'id', name: 'name' },
  id: '',
};
