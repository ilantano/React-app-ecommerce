import React from 'react';
import PropTypes from 'prop-types';
import ListHBT from '../../../../Core/ListHBT';
import { callApiGetListProductProvider } from '../../../../../api/listProductProvider';

function ListProductsProvider({ currentFilter }) {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      className: 'font-bold',
      align: 'left',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'Đại lý',
      dataIndex: 'agency_name',
      key: 'agency_name',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'agency_address',
      key: 'agency_address',
      sorter: true,
      className: 'font-bold',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      className: 'font-bold',
    },
    {
      title: 'Tổng số vé',
      dataIndex: 'total',
      key: 'total',
      className: 'font-bold',
    },
    {
      title: 'Hành động',
      dataIndex: 'status',
      key: 'status',
      className: 'font-bold',
      width: '150px',
      render: () => (
        <div className='flex justify-center'>
          <button
            type='button'
            className='btn'
            style={{ width: '100%' }}
            onClick={() => {}}
            id='btnRepair'
          >
            Chỉnh sửa
          </button>
          &nbsp;
          <button
            type='button'
            className='btn'
            style={{ width: '100%' }}
            onClick={() => {}}
            id='btnDelete'
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const runApi = async (value) => {
    const results = await callApiGetListProductProvider(value);
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

export default ListProductsProvider;

ListProductsProvider.propTypes = {
  currentFilter: PropTypes.object.isRequired,
};
