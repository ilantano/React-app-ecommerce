import React, { useState, useEffect } from 'react';
import { Drawer, Table, Button, Form, Modal, message, Tooltip } from 'antd';
import { DeleteOutlined, HighlightOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import { convertNumberToCurrency } from '@/utils/format';
import HANDLE_ERROR from '@/utils/handleError';
import AddPayment from './component/Payment';
import {
  callGetApiPaymentTypes,
  callGetApiPaymentExtras,
  callDeleteApiPaymentExtras,
  callPostApiPayment,
  callPutApiPayment,
  callPostApiPaymentOverAmount,
} from './api';
import { PAYMENT_STATUS, PAYMENT_TYPE } from './constants';
import { getListDetails } from '../Details/DetailsStore/selector';
import { getDetailsProduct } from '../Details/DetailsStore/actions';

const PaymentComponent = ({ visible, onClose, dataPayment, showDrawer }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const listDetails = useSelector(getListDetails);
  const phoneNumberUser = getLocalStorage(LOCAL_STORAGE_KEY.PHONE_NUMBER);

  const newDataPayment = dataPayment?.paymentDetails?.map((item, index) => {
    return { ...item, index: index + 1 };
  });

  const [isChangeTypePayment, setIsChangeTypePayment] = useState(false);
  const [isRepairPayment, setIsRepairPayment] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState();
  const [paymentType, setPaymentType] = useState();
  const [paymentExtras, setPaymentExtras] = useState();
  const [dataOrderPayment, setDataOrderPayment] = useState();

  const disableAddPayment =
    dataPayment?.orderStatusId === PAYMENT_STATUS.DONE ||
    dataPayment?.orderStatusId === PAYMENT_STATUS.REFUNDED ||
    listDetails?.paymentStatusId === PAYMENT_STATUS.DONE;

  useEffect(async () => {
    try {
      const resultPaymentType = await callGetApiPaymentTypes();
      const resultPaymentExtras = await callGetApiPaymentExtras();
      setPaymentType(resultPaymentType?.data);
      setPaymentExtras(resultPaymentExtras?.data);
    } catch (error) {
      HANDLE_ERROR(error);
    }
  }, []);

  const showModal = (row) => {
    setIsModalVisible(true);
    setDataOrderPayment(row);
  };

  const handleOk = async () => {
    try {
      await callDeleteApiPaymentExtras({
        paymentId: dataOrderPayment?.paymentId,
        orderId: dataOrderPayment?.orderId,
      });
      dispatch(getDetailsProduct.trigger(params?.orderId));
      setIsModalVisible(false);
      message.success('X??a thanh to??n th??nh c??ng!');
      showDrawer();
    } catch (error) {
      HANDLE_ERROR(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpenTypePayment = () => {
    setIsChangeTypePayment(true);
  };

  const handleOpenRepairTypePayment = (row) => {
    setIsRepairPayment(true);
    setIsUpdate(0);
    setDataOrderPayment(row);
  };

  const handleCloseTypePayment = () => {
    setIsChangeTypePayment(false);
    setIsRepairPayment(false);
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      width: '5%',
    },
    {
      title: 'Giao d???ch',
      dataIndex: 'paymentType',
      width: '20%',
      render: (_, row) => (
        <span>{row.paymentType ? row.paymentType : '--'}</span>
      ),
    },
    {
      title: 'H??nh th???c',
      dataIndex: 'extraPaymentType',
      width: '20%',
      render: (_, row) => (
        <span>{row.extraPaymentType ? row.extraPaymentType : '--'}</span>
      ),
    },
    {
      title: 'S??? ti???n',
      dataIndex: 'totalAmount',
      width: '15%',
      render: (_, row) => (
        <span className='flex items-center justify-end'>
          {convertNumberToCurrency(row.totalAmount)}
        </span>
      ),
    },
    {
      title: 'Ng?????i th???c hi???n',
      dataIndex: 'receiver',
      width: '20%',
    },
    {
      title: 'Th???i gian c???p nh???t',
      dataIndex: 'updateTime',
      align: 'center',
      width: '20%',
    },
    {
      title: 'H??nh ?????ng',
      width: '10%',
      render: (_, row) => {
        const disabledAction =
          dataPayment?.orderStatusId === PAYMENT_STATUS.DONE ||
          dataPayment?.orderStatusId === PAYMENT_STATUS.REFUNDED ||
          phoneNumberUser !== row?.phoneNumber ||
          (dataPayment?.orderStatusId === PAYMENT_STATUS.WAITING_REFUND &&
            row?.paymentTypeId === PAYMENT_TYPE.PAY_MONEY);
        return (
          <div className='flex justify-center'>
            <Tooltip
              title={
                disabledAction ? (
                  <div>
                    Kh??ng th??? ch???nh s???a giao d???ch c???a ng?????i kh??c ho???c ????n h??ng
                    ???? thanh to??n xong
                  </div>
                ) : (
                  <div>Ch???nh s???a</div>
                )
              }
              color={disabledAction ? '' : 'blue'}
            >
              <button
                type='button'
                onClick={() => handleOpenRepairTypePayment(row)}
                disabled={disabledAction}
                className='bg-transparent action w-1/5 text-blue-500 mr-3'
                id='btnRepair'
              >
                <HighlightOutlined className='mr-1 text-lg' />
              </button>
            </Tooltip>
            <Tooltip
              title={
                disabledAction ? (
                  <div>
                    Kh??ng th??? xo?? giao d???ch c???a ng?????i kh??c ho???c ????n h??ng ????
                    thanh to??n xong
                  </div>
                ) : (
                  <div>Xo??</div>
                )
              }
              color={disabledAction ? '' : 'red'}
              placement={disabledAction ? 'topRight' : 'top'}
            >
              <button
                type='button'
                danger
                onClick={() => {
                  showModal(row);
                }}
                disabled={disabledAction}
                className='ml-4 action bg-transparent w-1/5 text-red-500'
                id='btnDelete'
              >
                <DeleteOutlined className='mr-1 text-lg' />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Drawer
        width={1300}
        title={<p className='text-lg text-black'>Thanh to??n</p>}
        placement='right'
        onClose={onClose}
        visible={visible}
      >
        <div className='flex justify-between items-center mb-5'>
          <p className='text-lg font-bold'>Danh s??ch thanh to??n</p>
          {disableAddPayment ? (
            <Tooltip
              title={<div>Kh??ng th??? th??m khi ho?? ????n ???? thanh to??n xong</div>}
            >
              <Button
                type='primary'
                onClick={handleOpenTypePayment}
                danger
                disabled={disableAddPayment}
                id='btnAddPayment'
              >
                TH??M THANH TO??N
              </Button>
            </Tooltip>
          ) : (
            <Button
              type='primary'
              onClick={handleOpenTypePayment}
              danger
              disabled={disableAddPayment}
              id='btnAddPayment'
            >
              TH??M THANH TO??N
            </Button>
          )}
        </div>
        <Table
          dataSource={newDataPayment}
          columns={columns}
          pagination={false}
          scroll={{ y: 250 }}
          rowKey={(obj) => JSON.stringify(obj)}
        />
        <div className='flex justify-end mt-16 pt-4 text-lg border-t border-black'>
          <ul className='font-bold '>
            <li>T???ng h??a ????n: </li>
            <li>Chi???t kh???u: </li>
            <li>???? thanh to??n: </li>
            <li>C???n thu th??m: </li>
            <li>Tr??? l???i: </li>
          </ul>
          <ul className='ml-10 text-right'>
            <li>{convertNumberToCurrency(dataPayment?.totalBill)}</li>
            <li>{convertNumberToCurrency(dataPayment?.discountAmount)}</li>
            <li
              className={
                dataPayment?.totalBill <= dataPayment?.invoiceAmount
                  ? 'text-green-400'
                  : ''
              }
            >
              {convertNumberToCurrency(dataPayment?.invoiceAmount)}
            </li>
            <li>{convertNumberToCurrency(dataPayment?.remainingAmount)}</li>
            <li>{convertNumberToCurrency(dataPayment?.returnAmount)}</li>
          </ul>
        </div>
      </Drawer>
      <AddPayment
        isChangeTypePayment={isChangeTypePayment}
        handleCloseTypePayment={handleCloseTypePayment}
        title='Th??m thanh to??n'
        titleButton='TH??M'
        form={form}
        paymentType={paymentType}
        paymentExtras={paymentExtras}
        callApiPayment={callPostApiPayment}
        orderId={params.orderId}
        showDrawerPayment={showDrawer}
        callPostApiPaymentOverAmount={callPostApiPaymentOverAmount}
        isAddPayment
        dataOrderPayment={dataOrderPayment}
      />
      <AddPayment
        isChangeTypePayment={isRepairPayment}
        handleCloseTypePayment={handleCloseTypePayment}
        title='S???a thanh to??n'
        titleButtonUpdate='C???P NH???T'
        form={form}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        paymentType={paymentType}
        paymentExtras={paymentExtras}
        callApiPayment={callPutApiPayment}
        callPostApiPaymentOverAmount={callPostApiPaymentOverAmount}
        orderId={params.orderId}
        showDrawerPayment={showDrawer}
        orderStatusId={dataPayment?.orderStatusId}
        dataOrderPayment={dataOrderPayment}
      />
      <Modal
        title='X??a'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        onClose={false}
        footer={
          <div className='flex justify-center'>
            <Button onClick={handleOk} type='primary' danger id='btnDelete'>
              X??a
            </Button>
            <Button onClick={handleCancel} id='btnClose'>
              ????ng
            </Button>
          </div>
        }
      >
        <p>B???n c?? ch???c mu???n x??a m???c n??y?</p>
      </Modal>
    </>
  );
};

export default PaymentComponent;

PaymentComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  showDrawer: PropTypes.func.isRequired,
  dataPayment: PropTypes.object.isRequired,
};
