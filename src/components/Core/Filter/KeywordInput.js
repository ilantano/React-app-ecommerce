import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const { Item } = Form;

function KeywordInput({ name, label, placeholder }) {
  return (
    <Item name={name || 'name'} label={label || 'Tìm kiếm'}>
      <Input placeholder={placeholder || 'Họ tên / Email'} id='txtKeyword' />
    </Item>
  );
}

export default KeywordInput;

KeywordInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
