import React, { useState } from 'react';
import { Table, Tooltip, Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { convertNumberToCurrency } from '@/utils/format';
import Repair from './Repair';

const TableComponent = ({ dataSynthetic }) => {
  const [isVisable, setIsVisable] = useState(false);
  const [dataDrawSchedule, setDataDrawSchedule] = useState();

  const handleOpenDrawer = (row) => {
    setDataDrawSchedule(row);
    setIsVisable(true);
  };
  const handleCancel = () => {
    setIsVisable(false);
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Giờ quay thưởng',
      render: (_, row) => (
        <span className='flex items-center justify-end'>
          {convertNumberToCurrency(row.timeSprint)}
        </span>
      ),
    },
    {
      title: 'Thời gian đóng hệ thống',
      render: (_, row) => (
        <span className='flex items-center justify-end'>
          {convertNumberToCurrency(row.timeClose)}
        </span>
      ),
    },
    {
      title: 'Tác vụ',
      render: (_, row) => (
        <Tooltip title='Chỉnh sửa' color='blue' className='tooltip-disable'>
          <button
            type='button'
            className='action bg-transparent text-blue-500 mr-3'
            onClick={() => {
              handleOpenDrawer(row);
            }}
            id='btnRepair'
          >
            <HighlightOutlined className='mr-1 text-lg' />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      {dataSynthetic?.allCategory?.length === 0 ? (
        <p className='w-full mt-3 text-xl font-light'>Chưa có dữ liệu</p>
      ) : (
        <div className='w-2/3 mt-5'>
          <Table
            dataSource={dataSynthetic?.allCategory}
            columns={columns}
            pagination={false}
            scroll={{ y: 250 }}
            rowKey={(obj) => JSON.stringify(obj)}
          />
        </div>
      )}
      <Button onClick={handleOpenDrawer}>....</Button>
      <Repair
        isVisable={isVisable}
        setIsVisable={setIsVisable}
        handleCancel={handleCancel}
        dataDrawSchedule={dataDrawSchedule}
      />
    </>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  dataSynthetic: PropTypes.object.isRequired,
};
