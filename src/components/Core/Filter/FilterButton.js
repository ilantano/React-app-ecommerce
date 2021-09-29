import React from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function FilterButton() {
  return (
    <Button
      type='primary'
      htmlType='submit'
      id='btnSearch'
      icon={<SearchOutlined />}
      className='ant-btn-primary flex justify-center mt-5 w-full h-10'
    />
  );
}

export default FilterButton;
