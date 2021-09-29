import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  STATUS_VISIBLE_NONE,
  STATUS_VISIBLE_NO_DISCOUNT,
  STATUS_VISIBLE_DISCOUNT,
  STATUS_VISIBLE_TRADITIONAL,
} from '@/constants/listProductContants';
import { HighlightOutlined } from '@ant-design/icons';
import { Table, Drawer, Select, Form, message, Tooltip } from 'antd';
import HANDLE_ERROR from '@/utils/handleError';
import { DATE_FORMAT } from '@/utils/format';
import moment from 'moment';
import {
  callGetApiListItemDetails,
  callPutApiUpdateDiscount,
  callPutApiUpdateSeriTraditional,
} from './api';
import { UPDATE_SUCCESS, TICKET_STATUS } from './constants';
import { getListDetails } from '../DetailsStore/selector';

function DetailsCase({
  visible,
  setVisible,
  itemId,
  setIsReloadPage,
  isReloadPage,
}) {
  const [editCurrent, setEditCurrent] = useState('');
  const [listItemDetails, setListItemDetails] = useState();
  const [listItemSelect, setListItemSelect] = useState();
  const [listDetailsCaseOne, setListDetailsCaseOne] = useState();
  const [isFirstCall, setIsFirstCall] = useState(true);
  const [idCurrentDiscount, setIdCurrentDiscount] = useState();
  const [idCurrentTraditional, setIdCurrentTraditional] = useState([]);
  const [form] = Form.useForm();

  const listDetails = useSelector(getListDetails);

  useEffect(async () => {
    if (isFirstCall) {
      setIsFirstCall(false);
    }
    if (visible !== 0) {
      try {
        const result = await callGetApiListItemDetails(itemId);
        setListItemDetails(result?.data?.periodOther?.periodOtherDTOList);
        setListItemSelect(result?.data?.periodOther?.discountTypes);
        setListDetailsCaseOne(result?.data?.periodXSTTs?.periodXSTTDTOList);
      } catch (error) {
        HANDLE_ERROR(error);
      }
    }
  }, [visible, editCurrent]);

  useEffect(() => {
    form.setFieldsValue({ discount: listItemDetails?.[0]?.discountName });
  }, [listItemDetails]);

  // function convert [1DA,2DA,3DA,6DA,7DA] => [1DA-3DA, 6DA-7DA]
  const groupTicket = (arrIdTicket) => {
    const ticketCode = arrIdTicket?.split(',')?.[0];
    const ticketIdCode = ticketCode?.slice(ticketCode.length - 2);
    const arrIdNumber = arrIdTicket?.split(',')?.map((item) => {
      const arrListItem = item.split('');
      if (arrListItem.length >= 3) {
        return Number(arrListItem.slice(0, arrListItem.length - 2).join(''));
      }
      return null;
    });

    const groupArrNumber = arrIdNumber
      ?.sort((a, b) => {
        return a - b;
      })
      ?.reduce((r, n) => {
        const lastSubArray = r[r.length - 1];

        if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
          r.push([]);
        }

        r[r.length - 1].push(n);

        return r;
      }, []);

    let result = '';
    if (groupArrNumber?.length === 1) {
      if (groupArrNumber?.[0]?.length === 1) {
        result = `${groupArrNumber?.[0]?.[0].toString()}${ticketIdCode}`;
      } else {
        result = `${groupArrNumber?.[0]?.[0].toString()}${ticketIdCode}-${groupArrNumber?.[0]?.[
          groupArrNumber?.[0]?.length - 1
        ].toString()}${ticketIdCode}`;
      }
    }
    if (groupArrNumber?.length > 1) {
      result = groupArrNumber?.map((item, index) => {
        if (index < groupArrNumber?.length - 1) {
          if (item.length === 1) {
            return `${item?.[0]?.toString()}${ticketIdCode}, `;
          }
          return `${item?.[0].toString()}${ticketIdCode}-${item[
            item.length - 1
          ].toString()}${ticketIdCode}, `;
        }
        if (index === groupArrNumber?.length - 1) {
          if (item.length === 1) {
            return `${item?.[0]?.toString()}${ticketIdCode}`;
          }
          return `${item?.[0].toString()}${ticketIdCode}-${item[
            item.length - 1
          ].toString()}${ticketIdCode}`;
        }
        return '--';
      });
    }

    return result;
  };

  const columnsDetails = [
    {
      title: '#',
      dataIndex: 'index',
      className: 'font-bold',
      align: 'left',
      width: '20px',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'Mã kỳ',
      dataIndex: 'name',
      className: 'font-bold',
      align: 'left',
      width: '20px',
      render: (_, row) => <div>{row?.name ? row.name : '--'}</div>,
    },
    {
      title: 'Ngày mở thưởng',
      dataIndex: 'periodDate',
      className: 'font-bold',
      align: 'left',
      width: '20px',
      render: (_, row) => (
        <div>
          {moment(row?.periodDate).format(
            DATE_FORMAT.DAY_MONTH_YEAR_STRIKETHROUGH,
          )}
        </div>
      ),
    },
  ];

  const columnsDetailsUpdate = [
    {
      title: '#',
      dataIndex: 'index',
      className: 'font-bold',
      align: 'left',
      width: '20px',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'Mã kỳ',
      dataIndex: 'name',
      className: 'font-bold',
      width: '100px',
      render: (_, row) => <div>{row?.name ? row.name : '--'}</div>,
    },
    {
      title: 'Ngày mở thưởng',
      dataIndex: 'periodDate',
      className: 'font-bold',
      align: 'center',
      width: '200px',
      render: (_, row) => (
        <div>
          {moment(row?.periodDate).format(
            DATE_FORMAT.DAY_MONTH_YEAR_STRIKETHROUGH,
          )}
        </div>
      ),
    },
    {
      title: 'Đã giữ',
      dataIndex: 'numberSeri',
      className: 'font-bold',
      width: '200px',
      render: (_, row) => (
        <div>
          {row?.numberSeri}
          {row?.quantity ? `/${row?.quantity}` : ''}
        </div>
      ),
    },
    {
      title: 'Cửa hàng',
      dataIndex: 'agencyName',
      className: 'font-bold',
      width: '200px',
    },
    {
      title: 'Seri vé',
      dataIndex: 'series',
      className: 'font-bold',
      width: '200px',
      render: (_, row) => {
        if (editCurrent === row?.allocateTicketId) {
          return (
            <Form form={form}>
              <Form.Item>
                <>
                  <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Chọn vé'
                    defaultValue={idCurrentTraditional}
                    value={
                      idCurrentTraditional.length === row?.seriTickets.length
                        ? ['']
                        : idCurrentTraditional
                    }
                    onChange={handleChangeSeriTraditional}
                    onSelect={(e) => handleOnSelect(e, row?.seriTickets)}
                    onDeselect={handleDeSelect}
                    maxTagCount='responsive'
                  >
                    <Select.Option value='' label='Tất cả'>
                      Tất cả
                    </Select.Option>
                    {row?.seriTickets?.map((option) => (
                      <Select.Option key={option} value={option.trim()}>
                        {option.trim()}
                      </Select.Option>
                    ))}
                  </Select>
                </>
              </Form.Item>
            </Form>
          );
        }
        return <div>{row?.seri ? groupTicket(row?.seri) : '--'}</div>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      className: 'font-bold',
      align: 'center',
      width: '10%',
      render: (_, row) => {
        if (editCurrent === row?.allocateTicketId) {
          return (
            <button
              type='button'
              className='btn--danger h-10'
              onClick={() =>
                updateSeriTraditional(
                  row?.orderItemId,
                  row?.periodOrderItemId,
                  row?.periodDate,
                  row?.agencyId,
                )
              }
              id='btnSave'
            >
              Lưu
            </button>
          );
        }
        return (
          <Tooltip title='Chỉnh sửa' color='blue' className='tooltip-disable'>
            <button
              type='button'
              className='bg-transparent btn action text-blue-500 mr-3'
              onClick={() => {
                setIdCurrentTraditional(
                  row?.seri
                    ? row?.seri.split(',').map((str) => str.trim())
                    : [],
                );
                setEditCurrent(row?.allocateTicketId);
                form.setFieldsValue({ series: [''] });
              }}
              id='btnRepair'
              disabled={listDetails?.ticketStatusId === TICKET_STATUS}
            >
              <HighlightOutlined className='mr-1 text-lg' />
            </button>
          </Tooltip>
        );
      },
    },
  ];

  const handleChangeDrawer = () => {
    setVisible(STATUS_VISIBLE_NONE);
    setEditCurrent('');
    form.setFieldsValue({ series: [''] });
  };

  const handleChangeIdDiscount = (values) => {
    setIdCurrentDiscount(values);
  };

  const handleOnSelect = (value, options) => {
    if (!value) {
      const newArray = options.map((str) => str.trim());
      setIdCurrentTraditional(newArray);
    }
  };

  const handleDeSelect = (value) => {
    if (!value) {
      setIdCurrentTraditional([]);
    }
  };

  const handleChangeSeriTraditional = (values) => {
    setIdCurrentTraditional(
      values.filter((i) => i !== '').map((str) => str.trim()),
    );
  };
  const updateDiscount = async () => {
    const periodOrderItemId = [];
    listItemDetails.map((item) =>
      periodOrderItemId.push(item?.periodOrderItemId),
    );
    const data = {
      orderItemId: itemId,
      discountTypeId: idCurrentDiscount,
      periodOrderItemId,
    };
    try {
      await callPutApiUpdateDiscount(itemId, data);
      setVisible(STATUS_VISIBLE_NONE);
      message.success({
        content: UPDATE_SUCCESS,
        duration: 10,
      });
      setIsReloadPage(!isReloadPage);
    } catch (error) {
      message.error(error?.response?.data);
    }
  };

  const updateSeriTraditional = async (
    iD,
    orderItemId,
    periodDate,
    agencyId,
  ) => {
    const request = {
      orderItemId: iD,
      periodOrderItemId: orderItemId,
      periodDate,
      agencyId,
      seriTicketList: idCurrentTraditional,
    };
    try {
      await callPutApiUpdateSeriTraditional(itemId, request);
      setIdCurrentTraditional([]);
      setEditCurrent('');
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {STATUS_VISIBLE_TRADITIONAL === visible && (
        <Drawer
          title='Chi tiết'
          placement='right'
          visible={STATUS_VISIBLE_TRADITIONAL === visible}
          onClose={handleChangeDrawer}
          width={1200}
        >
          <p className='font-bold mb-5'>Chi tiết vé giữ</p>
          <Table
            rowKey='xxtt'
            locale={{ emptyText: 'Không có dữ liệu' }}
            columns={columnsDetailsUpdate}
            dataSource={listDetailsCaseOne}
            size='small'
            pagination={false}
            scroll={{ x: 1000 }}
          />
        </Drawer>
      )}
      {STATUS_VISIBLE_DISCOUNT === visible && (
        <Drawer
          title='Chi tiết'
          placement='right'
          visible={STATUS_VISIBLE_DISCOUNT === visible}
          onClose={handleChangeDrawer}
          width={720}
        >
          <p className='font-bold mb-5'>Kỳ mở thưởng</p>
          <Table
            rowKey='discount'
            locale={{ emptyText: 'Không có dữ liệu' }}
            columns={columnsDetails}
            dataSource={listItemDetails}
            size='small'
            pagination={false}
          />
          <p className='font-bold my-5'>Chiết khấu</p>
          <Form form={form}>
            <Form.Item name='discount'>
              <Select
                placeholder='Lựa chọn'
                className='w-full'
                onChange={handleChangeIdDiscount}
                id='selectChoice'
              >
                {listItemSelect?.map((item) => (
                  <Select.Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>

          <button
            type='button'
            className='btn--danger mt-10'
            onClick={updateDiscount}
            id='btnUpdate'
          >
            Cập nhật
          </button>
        </Drawer>
      )}
      {STATUS_VISIBLE_NO_DISCOUNT === visible && (
        <Drawer
          title='Chi tiết'
          placement='right'
          visible={STATUS_VISIBLE_NO_DISCOUNT === visible}
          onClose={handleChangeDrawer}
          width={720}
        >
          <p className='font-bold mb-5'>Kỳ mở thưởng</p>
          <Table
            rowKey='notdiscount'
            locale={{ emptyText: 'Không có dữ liệu' }}
            columns={columnsDetails}
            dataSource={listItemDetails}
            size='small'
            pagination={false}
          />
        </Drawer>
      )}
    </>
  );
}

export default DetailsCase;
DetailsCase.propTypes = {
  visible: PropTypes.number,
  itemId: PropTypes.number,
  setVisible: PropTypes.func,
  setIsReloadPage: PropTypes.func,
  isReloadPage: PropTypes.bool,
};
DetailsCase.defaultProps = {
  visible: 0,
  itemId: 0,
  setVisible: () => {},
  isReloadPage: false,
  setIsReloadPage: () => {},
};
