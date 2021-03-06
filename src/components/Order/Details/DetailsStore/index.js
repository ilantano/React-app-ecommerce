import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Modal, message, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import { convertNumberToCurrency } from '@/utils/format';
import { useDispatch, useSelector } from 'react-redux';
import HANDLE_ERROR from '@/utils/handleError';
import PaymentComponent from '@/pages/sales/orders/payment';
import { useInjectReducer } from '@/utils/inject-reducer';
import { useInjectSaga } from '@/utils/inject-saga';
import Info from '@/assets/image/info.svg';
import Trash from '@/assets/image/trash.svg';
import { PRODUCT_NAME } from '@/utils/constants';
import { getListDetails } from './selector';
import { getDetailsProduct } from './actions';

import saga from './saga';
import reducer from './reducer';
import {
  callGetApiAdminOrder,
  callApiDeleteDetailOrder,
  callApiUpdateDetailOrder,
  callApiGetSendZalo,
} from './api';
import Infomation from '../Infomation';
import DetailsCase from '../DetailsCase';
import { DELETE_SUCCESS, ONLINE, COMPLETE } from './constant';

export default function DetailOrder() {
  useInjectSaga({ key: 'listDetails', saga });
  useInjectReducer({ key: 'listDetails', reducer });
  const dispatch = useDispatch();
  const detailsProduct = useSelector(getListDetails);

  const params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(0);
  const [visiblePayment, setVisiblePayment] = useState(false);
  const [dataPayment, setDataPayment] = useState({});
  const [idDeleteDetails, setIdDeleteDetails] = useState();
  const [itemId, setItemId] = useState();
  const [indexDeleteDetails, setIndexDeleteDetails] = useState();
  const [isReloadPage, setIsReloadPage] = useState();

  useEffect(async () => {
    dispatch(getDetailsProduct.trigger(params?.orderId));
  }, [isReloadPage]);

  const isDisplayBtnDelete =
    detailsProduct?.orderSource === ONLINE ||
    (detailsProduct?.orderSource !== ONLINE && detailsProduct?.numberPrint > 0);

  const showDrawerPayment = async () => {
    try {
      const results = await callGetApiAdminOrder(params?.orderId);
      setDataPayment(results?.data);
    } catch (error) {
      HANDLE_ERROR(error);
    }
    setVisiblePayment(true);
  };

  const onClosePayment = () => {
    setVisiblePayment(false);
  };
  const showModal = (orderItemId, index) => {
    setIndexDeleteDetails(index);
    setIdDeleteDetails(orderItemId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await callApiDeleteDetailOrder(idDeleteDetails);
      dispatch(getDetailsProduct.delete(indexDeleteDetails));
      dispatch(getDetailsProduct.trigger(params?.orderId));
      message.success({
        content: DELETE_SUCCESS,
        duration: 10,
      });
    } catch (error) {
      message.error({
        content: error.response.data,
        duration: 10,
      });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateDetails = async (param, data) => {
    try {
      const results = await callApiUpdateDetailOrder(param, data);
      dispatch(getDetailsProduct.update({ param, data }));
      setIsReloadPage(!isReloadPage);
      if (results?.status === 200) {
        await callApiGetSendZalo();
      }
    } catch (error) {
      message.error(error?.response?.data);
    }
  };

  const columns = [
    {
      title: 'Lo???i v??',
      dataIndex: 'typeTicket',
      className: 'font-bold',
      align: 'left',
      width: '150px',
      render: (_, row) => (
        <div>
          {row?.categoryName === PRODUCT_NAME.VIETLOTT
            ? `${row?.categoryName} - ${row?.productName} - ${row?.subProduct}`
            : row?.productName === PRODUCT_NAME.DIENTOAN
            ? `${row?.categoryName} - ${row?.productName}`
            : `${row?.categoryName} - ${row?.subProduct}`}
        </div>
      ),
    },
    {
      title: 'S??? d??? th?????ng',
      dataIndex: 'numberValue',
      className: 'font-bold',
      align: 'left',
      width: '200px',
    },
    {
      title: 'S??? k???',
      dataIndex: 'periodCount',
      className: 'font-bold',
      width: '50px',
      render: (_, row) => (
        <div className='flex justify-end'>
          {!row?.periodCount ? '--' : row?.periodCount}
        </div>
      ),
    },
    {
      title: 'S??? l?????ng',
      dataIndex: 'quantity',
      className: 'font-bold',
      width: '50px',
      render: (_, row) => (
        <div className='flex justify-end'>
          {!row?.quantity ? '--' : row?.quantity}
        </div>
      ),
    },
    {
      title: 'Gi?? tr???',
      dataIndex: 'ticketPrice',
      className: 'font-bold',
      align: 'right',
      width: '80px',
      render: (_, row) => (
        <div>
          {!row?.priceTicket ? '--' : convertNumberToCurrency(row?.priceTicket)}
        </div>
      ),
    },
    {
      title: 'Th??nh ti???n',
      dataIndex: 'totalAmount',
      className: 'font-bold',
      align: 'right',
      width: '100px',
      render: (_, row) => (
        <div>{convertNumberToCurrency(row?.totalAmount)}</div>
      ),
    },
    {
      title: 'Gi??? h???',
      dataIndex: 'processStatus',
      className: 'font-bold',
      align: 'center  ',
      width: '20px',
      render: (_, row) => (
        <Tooltip title='S??? gi??? v?? gi??p kh??ch'>
          <Checkbox
            checked={row?.keepTicket ?? false}
            className={row?.keepTicket ? 'checkbox-disabled' : ''}
            disabled={
              row?.cancelTickets || detailsProduct?.ticketStatusId === COMPLETE
            }
            onChange={(e) =>
              updateDetails(row?.orderItemId, {
                keepTicket: e?.target?.checked,
                printed: row?.printed ?? false,
                cancelTickets: row?.cancelTickets ?? false,
              })
            }
          />
        </Tooltip>
      ),
    },
    {
      title: '???? in',
      dataIndex: 'processStatus',
      className: 'font-bold',
      align: 'center',
      width: '20px',
      render: (_, row) => (
        <Tooltip title='V?? ???? ???????c in/l???y ra'>
          <Checkbox
            className={row?.printed ? 'checkbox-disabled' : ''}
            checked={row?.printed ?? false}
            disabled={
              row?.cancelTickets || detailsProduct?.ticketStatusId === COMPLETE
            }
            onChange={(e) =>
              updateDetails(row?.orderItemId, {
                keepTicket: row?.keepTicket ?? false,
                printed: e?.target?.checked,
                cancelTickets: row?.cancelTickets ?? false,
              })
            }
            id='checkboxPrint'
          />
        </Tooltip>
      ),
    },
    {
      title: '???? h???y',
      dataIndex: 'processStatus',
      className: 'font-bold',
      align: 'center',
      width: '20px',
      render: (_, row) => {
        if (
          row?.cancelTickets === false &&
          row?.printed === false &&
          row?.keepTicket === false
        ) {
          return (
            <Tooltip title='V?? kh??ng th??? mua'>
              <Checkbox
                checked={row?.cancelTickets ?? false}
                disabled={detailsProduct?.ticketStatusId === COMPLETE ?? false}
                onChange={(e) =>
                  updateDetails(row?.orderItemId, {
                    keepTicket: false,
                    printed: false,
                    cancelTickets: e?.target?.checked,
                  })
                }
                id='checkboxDestroy'
              />
            </Tooltip>
          );
        }
        if (row?.cancelTickets) {
          return (
            <Tooltip title='V?? kh??ng th??? mua'>
              <Checkbox
                checked={row?.cancelTickets ?? false}
                className='checkbox-disabled'
                disabled={detailsProduct?.ticketStatusId === COMPLETE ?? false}
                onChange={() =>
                  updateDetails(row?.orderItemId, {
                    keepTicket: false,
                    printed: false,
                    cancelTickets: !row?.cancelTickets,
                  })
                }
                id='checkboxCancle'
              />
            </Tooltip>
          );
        }
        return (
          <Tooltip title='V?? kh??ng th??? mua'>
            <Checkbox
              checked={row?.cancelTickets ?? false}
              disabled={detailsProduct?.ticketStatusId === COMPLETE ?? false}
              onChange={() =>
                updateDetails(row?.orderItemId, {
                  keepTicket: false,
                  printed: false,
                  cancelTickets: !row?.cancelTickets,
                })
              }
              id='checkboxUpdate'
            />
          </Tooltip>
        );
      },
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      className: 'font-bold',
      align: 'left',
      width: '20px',
      render: (_, row, index) => (
        <div className='flex justify-start'>
          <Tooltip title='Chi ti???t' color='blue'>
            <div
              aria-hidden='true'
              className='mr-2 cursor-pointer'
              onClick={() => {
                setVisible(row?.screenPeriodOrderItemType);
                setItemId(row?.orderItemId);
              }}
              id='btnDetails'
            >
              <img src={Info} alt='chi-tiet' />
            </div>
          </Tooltip>
          {isDisplayBtnDelete ? (
            <Tooltip
              title={
                <div>
                  <p>????n h??ng c???n ph???i:</p>
                  <ul style={{ listStyle: 'inside' }}>
                    <li>Ch??a in h??a ????n</li>
                    <li>?????t t???i c???a h??ng</li>
                  </ul>
                </div>
              }
              placement='top'
              color='red'
            >
              <button
                type='button'
                aria-hidden='true'
                className='cursor-pointer btn-delete'
                onClick={() => showModal(row?.orderItemId, index)}
                id='btnDelete'
                disabled={isDisplayBtnDelete}
              >
                <img src={Trash} alt='xoa' />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title='X??a' color='red'>
              <button
                type='button'
                aria-hidden='true'
                className='cursor-pointer'
                onClick={() => showModal(row?.orderItemId, index)}
                id='btnDelete'
              >
                <img src={Trash} alt='xoa' />
              </button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Infomation
        showDrawerPayment={showDrawerPayment}
        infoProduct={detailsProduct}
        agencyId={detailsProduct?.agencyId}
        orderSource={detailsProduct?.orderSource}
        ticketStatusId={detailsProduct?.ticketStatusId}
        setIsReloadPage={setIsReloadPage}
        isReloadPage={isReloadPage}
      />
      <PaymentComponent
        visible={visiblePayment}
        showDrawer={showDrawerPayment}
        onClose={onClosePayment}
        dataPayment={dataPayment}
      />
      <Table
        locale={{ emptyText: 'Kh??ng c?? d??? li???u' }}
        columns={columns}
        dataSource={detailsProduct?.orderItemResponseList}
        size='small'
        pagination={false}
        scroll={{ x: 1000 }}
        rowKey={(obj) => JSON.stringify(obj)}
      />
      <Modal
        title='X??a'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            type='button'
            key='submit'
            className='btn--danger'
            onClick={handleOk}
            id='btnDelete'
          >
            X??a
          </button>,
          <button
            type='button'
            key='back'
            className='btn--gray'
            onClick={handleCancel}
            id='btnClose'
          >
            ????ng
          </button>,
        ]}
      >
        <p>B???n c?? ch???c mu???n x??a m???c n??y?</p>
      </Modal>
      <DetailsCase
        visible={visible}
        itemId={itemId}
        setVisible={setVisible}
        setIsReloadPage={setIsReloadPage}
        isReloadPage={isReloadPage}
      />
    </div>
  );
}
