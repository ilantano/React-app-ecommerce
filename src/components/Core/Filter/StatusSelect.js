import { get } from 'lodash';
import { Form, Select, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MESSAGE from '@/constants/message';
import VALUE_SELECT_ALL from './constants';

const { Item } = Form;
const { Option } = Select;

function StatusSelect({ getListOrderStatusesApi, form }) {
  const [listStatuses, setListStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(['']);

  const orderStatusRef = useRef(null);

  useEffect(async () => {
    try {
      const results = await getListOrderStatusesApi();
      setListStatuses(get(results, 'data') || []);
    } catch (error) {
      message.error(MESSAGE.GET_UNIT_STATUS);
    }
  }, []);

  const onSelectAgency = (value) => {
    if (
      value !== VALUE_SELECT_ALL &&
      selectedStatus.length + 1 < listStatuses.length
    ) {
      const newSelectAgency = selectedStatus.filter(
        (agency) => agency !== VALUE_SELECT_ALL,
      );
      form.setFieldsValue({ status: [...newSelectAgency, value] });
      return setSelectedStatus([...newSelectAgency, value]);
    }
    setSelectedStatus([VALUE_SELECT_ALL]);
    return form.setFieldsValue({ status: VALUE_SELECT_ALL });
  };

  const handleDeSelect = (value) => {
    setSelectedStatus(selectedStatus.filter((agency) => agency !== value));
  };
  const filterOption = (input, status) =>
    status?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0;

  return (
    <Item name='status' label='Trạng thái' className='mb-4'>
      <Select
        mode='multiple'
        placeholder='Thêm trạng thái'
        optionLabelProp='label'
        ref={orderStatusRef}
        showAction={['focus']}
        defaultValue={selectedStatus}
        onSelect={onSelectAgency}
        onDeselect={handleDeSelect}
        filterOption={filterOption}
        dropdownClassName='filter'
        maxTagCount='responsive'
        id='setectStatus'
      >
        <Option value='' label='Tất cả'>
          Tất cả
        </Option>
        {listStatuses.map((status) => (
          <Option key={status?.id} label={status?.name} value={status?.id}>
            {status?.name}
          </Option>
        ))}
      </Select>
    </Item>
  );
}

export default StatusSelect;

StatusSelect.propTypes = {
  getListOrderStatusesApi: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};
