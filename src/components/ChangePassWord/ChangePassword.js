import { Form, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import { validatePassword } from '@/utils/validates';
import { useHistory } from 'react-router-dom';
import Logo from '@/assets/image/happylucklogo.png';
import { getToken, TOKEN_KEY } from '@/utils/cookie';
import { ROUTER_ROADMAP } from '@/router/constants';
import { callPostCheckOTP, callPostChangePassword } from './api';
import CountDown from './CountDown';

const { Item } = Form;

const VALIDATION_ERRORS = {
  NEW_PASSWORD_REQUIRED: 'Vui lòng nhập mật khẩu mới của bạn',
  CONFIRM_PASSWORD_REQUIRED: 'Vui lòng xác nhận lại mật khẩu mới của bạn',
  NOT_SAME_PASSWORD: 'Mật khẩu mới không thể trùng với mật khẩu cũ',
  NOT_MATCH_PASSWORD: 'Mật khẩu xác nhận không trùng khớp',
  PASSWORD_INVALID:
    'Mật khẩu có độ dài từ 8 - 50 ký tự trong đó chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
};

const MESSAGE_SUCCESS = {
  PASS_OTP: 'Nhập mật khẩu mới!',
  CHANGE_PASSWORD_SUCCESS: 'Cập nhật mật khẩu thành công!',
};

export default function ChangePassword() {
  const token = getToken(TOKEN_KEY.TOKEN);

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [isVisibleChangePassword, setIsVisibleChangePassword] = useState(false);
  const history = useHistory();

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleFinishOTP = async (values) => {
    try {
      await callPostCheckOTP(values?.otp, {
        phoneNumber: localStorage.getItem('RESET_PHONE_NUMBER'),
      });
      setIsVisibleChangePassword(true);
      message.success({
        content: MESSAGE_SUCCESS.PASS_OTP,
        duuration: 10,
      });
    } catch (error) {
      message.error(error?.data);
    }
  };

  const handleFinishChangePassword = async (value) => {
    try {
      const data = {
        phoneNumber: localStorage.getItem('RESET_PHONE_NUMBER'),
        newPassword: value?.newPassword,
      };
      await callPostChangePassword(data);
      message.success({
        content: MESSAGE_SUCCESS.CHANGE_PASSWORD_SUCCESS,
        duuration: 10,
      });
      history.push('/dang-nhap');
    } catch (error) {
      message.error(error?.response?.data);
    }
  };
  const throughForgotPasswordPage = localStorage.getItem(
    'THROUGH_FORGOT_PASSWORD_PAGE',
  );
  const renderChangePasswordPage = () => {
    if (token) {
      history.push(ROUTER_ROADMAP.SELL.ORDER.ORDER);
    }
    if (!throughForgotPasswordPage) {
      history.push(ROUTER_ROADMAP.FORGOT_PASSWORD);
    }
    return (
      <div className='flex w-screen h-screen bg-white border'>
        <div className='flex items-center justify-center px-2 w-6/12 h-full'>
          <img className='ml-40' src={Logo} alt='logo' />
        </div>
        <div className='container w-10/12 px-12 py-8 m-auto border rounded-lg sm:w-4/12'>
          <h1 className='mb-6 text-3xl font-bold'>Quên mật khẩu</h1>
          {!isVisibleChangePassword ? (
            <Form form={form} layout='vertical' onFinish={handleFinishOTP}>
              <Item className='mb-3 block' name='otp' label='Mã OTP'>
                <Input placeholder='Mã OTP' className='mb-4' id='txtOtp' />
              </Item>
              <Item className='mt-5'>
                <div className='flex items-center'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    width='100%'
                    className='mr-5'
                    id='btnReset'
                  >
                    Đặt lại
                  </Button>
                  <CountDown />
                </div>
              </Item>
            </Form>
          ) : (
            <Form
              form={form}
              layout='vertical'
              onFinish={handleFinishChangePassword}
              onValuesChange={onRequiredTypeChange}
              requiredMark={requiredMark}
            >
              <Item
                name='newPassword'
                label='Mật khẩu mới'
                dependencies={['oldPassword']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: VALIDATION_ERRORS.NEW_PASSWORD_REQUIRED,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('oldPassword') === value) {
                        return Promise.reject(
                          new Error(VALIDATION_ERRORS.NOT_SAME_PASSWORD),
                        );
                      }
                      if (!value || !validatePassword(value)) {
                        return Promise.reject(
                          new Error(VALIDATION_ERRORS.PASSWORD_INVALID),
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password id='txtPassword' maxLength={50} />
              </Item>
              <Item
                name='confirmPassword'
                label='Nhập lại mật khẩu mới'
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: VALIDATION_ERRORS.CONFIRM_PASSWORD_REQUIRED,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(VALIDATION_ERRORS.NOT_MATCH_PASSWORD),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password id='txtPassword' maxLength={50} />
              </Item>
              <Item className='mt-5'>
                <div className='flex content-end uppercase'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    width='100%'
                    id='btnReset'
                  >
                    Đặt lại
                  </Button>
                </div>
              </Item>
            </Form>
          )}
        </div>
      </div>
    );
  };
  return <>{renderChangePasswordPage()}</>;
}
