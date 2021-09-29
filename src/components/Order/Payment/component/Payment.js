import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  Form,
  Select,
  Checkbox,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
} from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatMoney, formatNumberToMoney } from '@/utils/formatMoney';
import HANDLE_ERROR from '@/utils/handleError';
import {
  PAYMENT_TYPE,
  WINNING_BILL,
  CHECK_PAYMENT,
  PAYMENT_STATUS,
  CATEGORY,
} from '../constants';
import { getDetailsProduct } from '../../Details/DetailsStore/actions';
import { getListDetails } from '../../Details/DetailsStore/selector';

const { Option } = Select;
const addPayment = ({
  isChangeTypePayment,
  handleCloseTypePayment,
  title,
  titleButton,
  titleButtonUpdate,
  paymentExtras,
  callApiPayment,
  showDrawerPayment,
  orderId,
  callPostApiPaymentOverAmount,
  dataOrderPayment,
  isUpdate,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const params = useParams();
  const listDetails = useSelector(getListDetails);

  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleConfirm, setIsModalVisibleConfirm] = useState(false);
  const [isModalVisibleRepair, setIsModalVisibleRepair] = useState(false);
  const [isWinningBill, setIsWinningBill] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
    setIsModalVisibleConfirm(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleConfirm(false);
    setIsModalVisibleRepair(false);
  };

  const handleOkConfirm = async () => {
    try {
      const results = await callApiPayment({
        dataPayment: {
          paymentTypeId: form.getFieldsValue()?.typePayment,
          paymentId: dataOrderPayment?.paymentId || '',
          extraPaymentId: form.getFieldsValue()?.type || '',
          describe: form.getFieldsValue()?.reason || '',
          invoiceId: form.getFieldsValue()?.invoiceId || '',
          totalAmount:
            form.getFieldsValue()?.money || form.getFieldsValue()?.moneyReturn,
        },
        orderId,
      });
      message.success(results?.data);
      dispatch(getDetailsProduct.trigger(params?.orderId));
      setIsModalVisible(false);
      setIsModalVisibleConfirm(false);
      setIsModalVisibleRepair(false);
      handleCloseTypePayment();
      showDrawerPayment();
    } catch (error) {
      message.error(error?.response?.data);
    }
  };

  const handleValidateMoney = (rules, value, callback) => {
    if (!value) {
      return callback('Số tiền không được để trống');
    }
    return Promise.resolve();
  };

  const handleValidateFormality = (rules, value, callback) => {
    if (!value) {
      return callback('Hình thức không được để trống');
    }
    return Promise.resolve();
  };

  const handleChangePayment = () => {
    setIsChecked(false);
  };

  const handleFinished = async (values) => {
    try {
      const result = await callPostApiPaymentOverAmount({
        paymentTypeId: form.getFieldsValue()?.typePayment || '',
        extraPaymentId: values?.type || '',
        orderId,
        paymentId: dataOrderPayment?.paymentId || '',
        totalAmount: values?.money || values?.moneyReturn,
      });
      switch (result?.data) {
        case CHECK_PAYMENT.EXCEED:
          setIsModalVisible(true);
          break;
        case CHECK_PAYMENT.CONFIRM:
          setIsModalVisibleConfirm(true);
          break;
        case CHECK_PAYMENT.ADD:
          try {
            const results = await callApiPayment({
              dataPayment: {
                paymentTypeId: form.getFieldsValue()?.typePayment,
                extraPaymentId: values?.type || '',
                describe: values?.reason || '',
                invoiceId: values?.invoiceId || '',
                totalAmount: values?.money || values?.moneyReturn,
                paymentId: dataOrderPayment?.paymentId || '',
              },
              orderId,
            });
            message.success(results?.data);
            handleCloseTypePayment();
            showDrawerPayment();
            dispatch(getDetailsProduct.trigger(params?.orderId));
          } catch (error) {
            HANDLE_ERROR(error);
          }
          break;
      }
    } catch (error) {
      if (error?.response?.data === CHECK_PAYMENT.ERROR) {
        setIsModalVisibleRepair(true);
      } else {
        message.error(error?.response?.data);
      }
    }
  };

  const handleChangeChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleChangeFormality = (value) => {
    // eslint-disable-next-line no-unused-expressions
    value === WINNING_BILL ? setIsWinningBill(true) : setIsWinningBill(false);
    form.setFieldsValue({
      invoiceId: '',
      money: '',
    });
    setIsChecked(false);
  };

  useEffect(() => {
    if (isUpdate === 0) {
      form.setFieldsValue({
        type: dataOrderPayment?.extraPaymentTypeId || '',
        money: dataOrderPayment?.totalAmount || '',
        moneyReturn: dataOrderPayment?.totalAmount || '',
      });
    }
    if (isChangeTypePayment)
      form.setFieldsValue({
        typePayment:
          listDetails?.paymentStatusId === PAYMENT_STATUS.WAITING_REFUND
            ? PAYMENT_TYPE.RETURN
            : PAYMENT_TYPE.PAY_MONEY,
      });
    else form.resetFields();
    setIsChecked(false);
    setIsWinningBill(false);
  }, [isChangeTypePayment]);

  return (
    <>
      <Drawer
        width={520}
        title={<p className='text-lg text-black'>{title}</p>}
        placement='right'
        onClose={handleCloseTypePayment}
        visible={isChangeTypePayment}
        requiredMark={false}
      >
        <Form form={form} layout='vertical' onFinish={handleFinished}>
          <Form.Item label='Giao dịch' name='typePayment'>
            <Radio.Group onChange={handleChangePayment}>
              <Radio
                value={2}
                disabled={
                  listDetails?.paymentStatusId !== PAYMENT_STATUS.NO_PAYMENT
                }
              >
                {CATEGORY.PAY_ADDITIONALLY}
              </Radio>
              <Radio
                value={1}
                disabled={
                  listDetails?.paymentStatusId === PAYMENT_STATUS.DONE ||
                  listDetails?.paymentStatusId === PAYMENT_STATUS.NO_PAYMENT
                }
              >
                {CATEGORY.REFUND}
              </Radio>
            </Radio.Group>
          </Form.Item>
          {listDetails?.paymentStatusId === PAYMENT_STATUS.NO_PAYMENT ? (
            <Form.Item>
              <Form.Item
                label='Hình thức'
                name='type'
                rules={[{ validator: handleValidateFormality }]}
              >
                <Select onChange={handleChangeFormality} id='setectFormat'>
                  {paymentExtras?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {isWinningBill && (
                <Form.Item label='Mã hóa đơn' name='invoiceId'>
                  <Input id='txtBillCode' />
                </Form.Item>
              )}
              <Form.Item
                label='Số tiền (*)'
                name='money'
                rules={[{ validator: handleValidateMoney }]}
              >
                <InputNumber
                  min={0}
                  step={1000}
                  formatter={(value) => formatNumberToMoney(value)}
                  parser={(value) => formatMoney(value)}
                  id='numberMoney'
                />
              </Form.Item>
            </Form.Item>
          ) : (
            <Form.Item>
              <Form.Item
                label='Số tiền hoàn trả (*)'
                name='moneyReturn'
                className='label-width'
                rules={[{ validator: handleValidateMoney }]}
              >
                <InputNumber
                  min={0}
                  step={1000}
                  formatter={(value) => formatNumberToMoney(value)}
                  parser={(value) => formatMoney(value)}
                  id='numberMoney'
                />
              </Form.Item>
              <Form.Item label='Lý do' name='reason'>
                <Input id='txtReason' />
              </Form.Item>
            </Form.Item>
          )}
          <div className='flex justify-between mt-5 items-center'>
            <Form.Item name='checkbox'>
              <Checkbox
                onChange={handleChangeChecked}
                checked={isChecked}
                id='checkBox'
              >
                Tôi đảm bảo những thông tin trên chính xác
              </Checkbox>
            </Form.Item>
            <Form.Item name='button'>
              <Button
                type='primary'
                htmlType='submit'
                danger
                disabled={!isChecked}
                id='btnAction'
              >
                {isUpdate === 0
                  ? titleButtonUpdate
                  : listDetails?.paymentStatusId === 2
                  ? titleButton
                  : 'HOÀN TRẢ'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
      <Modal
        title='Số tiền không khớp'
        visible={isModalVisible}
        closable={false}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-center'>
            <Button onClick={handleOk} type='primary' danger id='btnAdd'>
              THÊM
            </Button>
            <Button onClick={handleCancel} id='btnClose'>
              HỦY
            </Button>
          </div>
        }
      >
        <p>
          Số tiền sẽ vượt quá số tiền cần phải thu. Bạn có chắc muốn thêm không?
        </p>
      </Modal>
      <Modal
        title='Hành động không thể hoàn tác'
        visible={isModalVisibleConfirm}
        closable={false}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-center'>
            <Button
              onClick={handleOkConfirm}
              type='primary'
              danger
              id='btnConfirm'
            >
              XÁC NHẬN
            </Button>
            <Button onClick={handleCancel} id='btnClose'>
              ĐÓNG
            </Button>
          </div>
        }
      >
        <p>
          Sau khi xác nhận, đơn hàng sẽ chuyển trạng thái và không thể thay đổi
          các thanh toán.
        </p>
      </Modal>
      <Modal
        title='Số tiền không khớp'
        visible={isModalVisibleRepair}
        closable={false}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-center'>
            <Button
              onClick={handleCancel}
              type='primary'
              danger
              id='btnConfirm'
            >
              ĐỒNG Ý
            </Button>
          </div>
        }
      >
        <p>
          Số tiền vượt quá số lượng cần trả. Không thực hiện được giao dịch.
        </p>
      </Modal>
    </>
  );
};

addPayment.propTypes = {
  isChangeTypePayment: PropTypes.bool.isRequired,
  handleCloseTypePayment: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleButton: PropTypes.string,
  titleButtonUpdate: PropTypes.string,
  isUpdate: PropTypes.number,
  paymentType: PropTypes.array,
  paymentExtras: PropTypes.array,
  callApiPayment: PropTypes.func.isRequired,
  callPostApiPaymentOverAmount: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  dataOrderPayment: PropTypes.object,
};

addPayment.defaultProps = {
  titleButtonUpdate: '',
  titleButton: '',
  isUpdate: null,
  paymentType: [],
  paymentExtras: [],
  dataOrderPayment: {},
};
export default addPayment;
