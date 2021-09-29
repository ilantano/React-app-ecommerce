import React from 'react';
import PropTypes from 'prop-types';
import { CopyOutlined } from '@ant-design/icons';
import ListHBT from '../../../Core/ListHBT';
import { callApiGetListWinners } from '../../../../api/managerReward';

function ListWinners({ currentFilter }) {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      className: 'font-bold',
      align: 'left',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      className: 'font-bold',
    },
    {
      title: 'Số dự thưởng',
      dataIndex: 'numberPrize',
      key: 'numberPrize',
      className: 'font-bold',
    },
    {
      title: 'Kỳ quay số',
      dataIndex: 'time',
      key: 'time',
      className: 'font-bold',
    },
    {
      title: 'Giá trị trúng',
      dataIndex: 'value',
      key: 'value',
      className: 'font-bold',
    },
    {
      title: 'Người trả',
      dataIndex: 'payer',
      key: 'payer',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusName',
      key: 'statusName',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Hành động',
      dataIndex: 'status',
      key: 'status',
      className: 'font-bold',
      width: '150px',
      render: (value) => (
        <div className='flex justify-center'>
          <button
            type='button'
            className='btn'
            style={{ width: '100%' }}
            onClick={() => {}}
            id='btnCopy'
          >
            <CopyOutlined className='mr-1' />
            {value === 1 ? 'Hủy trả thưởng' : 'Trả thưởng'}
          </button>
        </div>
      ),
    },
  ];

  const runApi = async (value) => {
    const results = await callApiGetListWinners(value);
    return results;
  };

  return (
    <div>
      <ListHBT
        columns={columns}
        currentFilter={currentFilter}
        runApi={runApi}
      />
    </div>
  );
}

export default ListWinners;

ListWinners.propTypes = {
  currentFilter: PropTypes.object.isRequired,
};
