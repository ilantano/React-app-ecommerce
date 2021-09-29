import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button, Modal } from 'antd';
import { HighlightOutlined, DeleteOutlined } from '@ant-design/icons';
import ListHBT from '../../../../Core/ListHBT';
import ActionComponent from './ActionComponent';
import { callPostApiStopDraw } from '../../api';
import { setDataCategoryStopDraw } from '../helper';

function ListCategoryStopDraw({ currentFilter }) {
  const [isVisibleAddStopDraw, setIsVisibleAddStopDraw] = useState(false);
  const [isVisibleRepairStopDraw, setIsVisibleRepairStopDraw] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataRepair, setDataRepair] = useState();
  const [isUpdate, setIsUpdate] = useState(1);
  const showModal = () => {
    setIsModalVisible(true);
    // setDataOrderPayment(row);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleOpenAddStopDraw = () => {
    setIsVisibleAddStopDraw(true);
  };

  const handleOpenRepairStopDraw = (row) => {
    setIsVisibleRepairStopDraw(true);
    setDataRepair(row);
    setIsUpdate(0);
  };

  const handleCancel = () => {
    setIsVisibleAddStopDraw(false);
    setIsVisibleRepairStopDraw(false);
    setIsModalVisible(false);
  };
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
      title: 'Dừng mở thưởng',
      dataIndex: 'endDate',
      key: 'date',
      sorter: true,
      className: 'font-bold',
      width: '25%',
    },
    {
      title: 'Bắt đầu mở thưởng',
      dataIndex: 'startDate',
      key: 'begin',
      className: 'font-bold',
      width: '20%',
    },
    {
      title: 'Sản phẩm áp dụng',
      dataIndex: 'product',
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
      render: (_, row) => (
        <div className='flex justify-center'>
          <Tooltip title='Chỉnh sửa' color='blue' className='tooltip-disable'>
            <button
              type='button'
              className='action bg-transparent text-blue-500 mr-3'
              onClick={() => {
                handleOpenRepairStopDraw(row);
              }}
              id='btnRepair'
            >
              <HighlightOutlined className='mr-1 text-lg' />
            </button>
          </Tooltip>
          <button
            type='button'
            danger
            onClick={() => {
              showModal(row);
            }}
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
    const results = await callPostApiStopDraw(value);
    return results;
  };

  return (
    <div>
      <Button
        onClick={handleOpenAddStopDraw}
        className=' mb-5'
        type='primary'
        id='btnCreate'
      >
        Thêm ngày nghỉ
      </Button>
      <ListHBT
        columns={columns}
        currentFilter={currentFilter}
        runApi={runApi}
        setDataGetList={setDataCategoryStopDraw}
      />
      <ActionComponent
        title='Thêm ngày nghỉ'
        titleButton='Thêm mới'
        visible={isVisibleAddStopDraw}
        handleCancel={handleCancel}
      />
      <ActionComponent
        title='Chỉnh sửa ngày nghỉ'
        titleButton='Lưu'
        visible={isVisibleRepairStopDraw}
        handleCancel={handleCancel}
        dataRepair={dataRepair}
        isUpdate={isUpdate}
      />
      <Modal
        title='Xóa ngày nghỉ'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        onClose={false}
        footer={
          <div className='flex justify-center'>
            <Button onClick={handleOk} type='primary' danger id='btnDelete'>
              Xóa
            </Button>
            <Button onClick={handleCancel} id='btnClose'>
              Đóng
            </Button>
          </div>
        }
      >
        <p>Bạn có chắc muốn xóa mục này?</p>
      </Modal>
    </div>
  );
}

export default ListCategoryStopDraw;

ListCategoryStopDraw.propTypes = {
  currentFilter: PropTypes.object.isRequired,
};
