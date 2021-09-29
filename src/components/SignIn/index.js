import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OneSignal from 'react-onesignal';
import { ROUTER_ROADMAP } from '@/router/constants';
import { validatePhoneNumber } from '@/utils/validates';
import { getSignIn } from './store/actions';
import { getLoading, getIsSignInFailed } from './store/selector';
import Logo from '../../assets/image/happylucklogo.png';

const { Item } = Form;

const ERROR = {
  SIGN_IN_ERROR_MESSAGE: 'Thông tin đăng nhập không chính xác!',
  PASS_WORD_IS_EMPTY: 'Nhập vào mật khẩu của bạn!',
  INVALID_PHONE_NUMBER: 'Số điện thoại không đúng',
  PHONE_NUMBER_IS_REQUIRED: 'Số điện thoại là trường bắt buộc',
};

export default function SignIn() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const loading = useSelector(getLoading);

  const isSignInFailed = useSelector(getIsSignInFailed);
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    OneSignal.getUserId().then((item) => {
      // do other stuff
      setPlayerId(item);
    });
  }, []);

  const handleFinished = () => {
    dispatch(
      getSignIn.trigger({
        phoneNumber: form.getFieldsValue().phoneNumber,
        password: form.getFieldsValue().password,
        oneSignalPlayerId: playerId,
      }),
    );
  };

  const handleChange = () => {
    dispatch(getSignIn.changeFormTrigger());
  };

  const handleValidatePhoneNumber = (rules, value, callback) => {
    if (!value) {
      return callback(ERROR.PHONE_NUMBER_IS_REQUIRED);
    }
    if (!validatePhoneNumber(value)) {
      return callback(ERROR.INVALID_PHONE_NUMBER);
    }
    return Promise.resolve();
  };

  return (
    <div className='flex w-screen h-screen bg-white border'>
      <div className='flex items-center justify-center px-2 w-6/12 h-full'>
        <img className='ml-40' src={Logo} alt='logo' />
      </div>
      <div className='container w-10/12 px-12 py-8 m-auto border rounded-lg sm:w-4/12'>
        <h1 className='mb-6 text-3xl font-bold text-purple-600'>Đăng Nhập</h1>
        <Form onFinish={handleFinished} onChange={handleChange} form={form}>
          <Item
            className='mb-3'
            name='phoneNumber'
            required
            rules={[{ validator: handleValidatePhoneNumber }]}
          >
            <Input placeholder='Tài khoản' className='mb-4' id='txtuser' />
          </Item>
          <Item
            name='password'
            required
            rules={[
              {
                required: true,
                message: ERROR.PASS_WORD_IS_EMPTY,
              },
            ]}
          >
            <Input.Password
              id='txtpassword'
              placeholder='Mật khẩu'
              className='mb-4'
            />
          </Item>
          {isSignInFailed && (
            <Item>
              <div className='ant-form-item-explain ant-form-item-explain-error'>
                <div role='alert'>{ERROR.SIGN_IN_ERROR_MESSAGE}</div>
              </div>
            </Item>
          )}
          <Item className='text-right'>
            <div className='text-right text-blue-400'>
              <Link to={ROUTER_ROADMAP.FORGOT_PASSWORD}>Quên mật khẩu?</Link>
            </div>
          </Item>
          <Item>
            <div className='flex content-end'>
              <Button
                variant={loading ? 'disabled' : ''}
                type='primary'
                htmlType='submit'
                disabled={loading}
                loading={loading}
                width='100%'
                id='btnlogin'
                value='Login'
              >
                Đăng nhập
              </Button>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
}
