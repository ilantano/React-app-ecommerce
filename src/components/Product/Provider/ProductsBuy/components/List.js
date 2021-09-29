import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { HighlightOutlined, DeleteOutlined } from '@ant-design/icons';
import ListHBT from '../../../../Core/ListHBT';
import { callApiGetListProductBuy } from '../../../../../api/listProductProvider';

function ListProductsBuy({ currentFilter }) {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      className: 'font-bold',
      align: 'left',
      render: (_, item, index) => index + 1,
      width: '5%',
    },
    {
      title: 'Ngày mở thưởng',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      className: 'font-bold',
      width: '25%',
    },
    {
      title: 'Vé đầu',
      dataIndex: 'begin',
      key: 'begin',
      className: 'font-bold',
      width: '20%',
    },
    {
      title: 'Vé cuối',
      dataIndex: 'end',
      key: 'end',
      className: 'font-bold',
      width: '20%',
    },
    {
      title: 'Tác vụ',
      dataIndex: 'status',
      key: 'status',
      className: 'font-bold',
      width: '150px',
      render: () => (
        <div className='flex justify-center'>
          <Tooltip title='Chỉnh sửa' color='blue' className='tooltip-disable'>
            <button
              type='button'
              className='action bg-transparent text-blue-500 mr-3'
              // onClick={() => {}}
              id='btnRepair'
            >
              <HighlightOutlined className='mr-1 text-lg' />
            </button>
          </Tooltip>
          <button
            type='button'
            danger
            // onClick={() => {
            //   showModal(row);
            // }}
            // disabled={disabledAction}
            className='ml-4 action bg-transparent w-1/5 text-red-500'
            id='btnDelete'
          >
            <DeleteOutlined className='mr-1 text-lg' />
          </button>
        </div>
      ),
    },
  ];

  const runApi = async (value) => {
    const results = await callApiGetListProductBuy(value);
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

export default ListProductsBuy;

ListProductsBuy.propTypes = {
  currentFilter: PropTypes.object.isRequired,
};
