import { Form, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { callApiSendNumberConfirm } from '@/api/forgotPassword';
import { setLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import Logo from '@/assets/image/happylucklogo.png';
import { getToken, TOKEN_KEY } from '@/utils/cookie';
import { ROUTER_ROADMAP } from '@/router/constants';
import { validatePhoneNumber } from '../../utils/validates';

const { Item } = Form;

const ERROR = {
  SIGN_IN_ERROR_MESSAGE: 'Thông tin đăng nhập không chính xác!',
  PASS_WORD_IS_EMPTY: 'Nhập vào mật khẩu của bạn!',
  INVALID_PHONE_NUMBER: 'Số điện thoại không đúng',
  PHONE_NUMBER_IS_REQUIRED: 'Số điện thoại không được để trống',
  PHONE_NUMBER_NOT_FOUND: 'Không tìm thấy số điện thoại, vui lòng kiểm tra lại',
};

const SUCCESS = 'Nhập mã OTP để xác minh!';

export default function ForgotPassword() {
  const token = getToken(TOKEN_KEY.TOKEN);

  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false);
  const history = useHistory();
  const handleValidatePhoneNumber = (rules, value, callback) => {
    if (!value) {
      return callback(ERROR.PHONE_NUMBER_IS_REQUIRED);
    }
    if (!validatePhoneNumber(value)) {
      return callback(ERROR.INVALID_PHONE_NUMBER);
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    setIsDisable(true);
    try {
      await callApiSendNumberConfirm(values);
      setLocalStorage(LOCAL_STORAGE_KEY.EMAIL, values.email);
      message.success({
        content: SUCCESS,
        duration: 8,
      });
      localStorage.setItem('RESET_PHONE_NUMBER', values?.phoneNumber);
      localStorage.setItem('THROUGH_FORGOT_PASSWORD_PAGE', true);
      history.push('/dat-lai-mat-khau');
    } catch (err) {
      message.error(err?.response?.data);
    }
    setIsDisable(false);
    return values;
  };
  return (
    <>
      {token ? (
        history.push(ROUTER_ROADMAP.SELL.ORDER.ORDER)
      ) : (
        <div className='flex w-screen h-screen bg-white border'>
          <div className='flex items-center justify-center px-2 w-6/12 h-full'>
            <img className='ml-40' src={Logo} alt='logo' />
          </div>
          <div className='container w-10/12 px-12 py-8 m-auto border rounded-lg sm:w-4/12'>
            <h1 className='mb-6 text-3xl font-bold'>Quên mật khẩu</h1>
            <Form
              form={form}
              layout='horizontal'
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Item
                className='mb-3 block'
                name='phoneNumber'
                rules={[{ validator: handleValidatePhoneNumber }]}
                label='Số điện thoại'
              >
                <Input
                  placeholder='Số điện thoại'
                  className='mb-4'
                  id='txtPhoneNumber'
                />
              </Item>
              <Item className='mt-5'>
                <div className='flex content-end uppercase'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    width='100%'
                    disabled={isDisable}
                    id='btnSendCode'
                  >
                    Gửi mã
                  </Button>
                </div>
              </Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
