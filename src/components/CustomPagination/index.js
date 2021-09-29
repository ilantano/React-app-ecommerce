import React from 'react';
import { Select, Pagination } from 'antd';
import PropTypes from 'prop-types';

const optionPageSize = [
  {
    label: 'Hiển thị 10 mục / trang',
    value: 10,
  },
  {
    label: 'Hiển thị 20 mục / trang',
    value: 20,
  },
  {
    label: 'Hiển thị 50 mục / trang',
    value: 50,
  },
];

export default function CustomPagination({
  total,
  currentFilter = {},
  changePagination,
}) {
  const { pageSize = 10, pageNo = 1 } = currentFilter;

  const handleChangePagination = (value) => {
    changePagination(value);
  };

  const handleChangePageSize = (value) => {
    handleChangePagination({ pageSize: value, current: 1 });
  };

  const handlePageChange = (value) => {
    handleChangePagination({ current: value });
  };

  return (
    <div className='flex mt-5'>
      <div className='ml-auto'>
        <Pagination
          onChange={handlePageChange}
          current={pageNo}
          total={total || 1}
          pageSize={pageSize}
          showSizeChanger={false}
          defaultCurrent
        />
      </div>
      <div className='ml-1 height-paging'>
        <Select
          defaultValue={10}
          onChange={handleChangePageSize}
          value={pageSize}
          id='setectPageSize'
        >
          {optionPageSize.map((option) => (
            <Select.Option value={option.value} key={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
}

CustomPagination.propTypes = {
  total: PropTypes.number,
  currentFilter: PropTypes.object,
  changePagination: PropTypes.func,
};

CustomPagination.defaultProps = {
  total: 10,
  currentFilter: { pageNo: 1, pageSize: 10 },
  changePagination: () => null,
};
