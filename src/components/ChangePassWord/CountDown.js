import React, { useState, useEffect } from 'react';
import { callApiSendNumberConfirm } from '@/api/forgotPassword';
import HANDLE_ERROR from '@/utils/handleError';

const { REACT_APP_INITIAL_COUNT } = process.env;

export default function CountDown() {
  const [secondsRemaining, setSecondsRemaining] = useState(
    REACT_APP_INITIAL_COUNT,
  );
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  const twoDigits = (num) => String(num).padStart(2, '0');

  useEffect(async () => {
    setTimeout(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setIsDisableBtn(false);
      }
    }, 1000);
  }, [secondsRemaining]);

  const sendOTPAgain = async () => {
    try {
      await callApiSendNumberConfirm({
        phoneNumber: localStorage.getItem('RESET_PHONE_NUMBER'),
      });
      setIsDisableBtn(true);
      setSecondsRemaining(REACT_APP_INITIAL_COUNT);
    } catch (error) {
      HANDLE_ERROR(error);
    }
  };

  return (
    <>
      <div className='text-blue-500'>
        <button
          type='button'
          className='btn mr-5'
          id='btnSend'
          disabled={isDisableBtn}
          onClick={sendOTPAgain}
        >
          Gửi lại mã
        </button>
      </div>
      {isDisableBtn !== false && (
        <i>
          còn ( {twoDigits(minutesToDisplay)} phút {twoDigits(secondsToDisplay)}{' '}
          giây )
        </i>
      )}
    </>
  );
}
