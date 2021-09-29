import React from 'react';
import PropTypes from 'prop-types';
import { CopyOutlined } from '@ant-design/icons';
import ListHBT from '../../../Core/ListHBT';
import { callApiGetListPrizeResult } from '../../../../api/managerReward';

function ListPrizeResult({ currentFilter }) {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      className: 'font-bold',
      align: 'left',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'ID',
      dataIndex: 'rewardId',
      key: 'rewardId',
      className: 'font-black clear-css',
      sorter: true,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      className: 'font-bold',
    },
    {
      title: 'Kỳ quay số',
      dataIndex: 'time',
      key: 'time',
      className: 'font-bold',
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: true,
      className: 'font-bold',
      render: (_, row) => (
        <div>
          {row?.createdDate} - {row?.createdTime}{' '}
        </div>
      ),
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'authorUpdate',
      key: 'authorUpdate',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Người duyệt',
      dataIndex: 'authorAccept',
      key: 'authorAccept',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      className: 'font-bold',
      width: '200px',
      render: () => (
        <div className='flex justify-center'>
          <button
            type='button'
            className='btn'
            onClick={() => {}}
            id='btnDetails'
          >
            <CopyOutlined className='mr-1' />
            Chi tiết
          </button>
        </div>
      ),
    },
  ];

  const runApi = async (value) => {
    const results = await callApiGetListPrizeResult(value);
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

export default ListPrizeResult;

ListPrizeResult.propTypes = {
  currentFilter: PropTypes.object.isRequired,
};
