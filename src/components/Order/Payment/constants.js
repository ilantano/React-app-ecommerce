export const PAYMENT_TYPE = {
  PAY_MONEY: 2,
  RETURN: 1,
};

export const WINNING_BILL = 3;

export const CHECK_PAYMENT = {
  EXCEED:
    'Số tiền sẽ vượt quá số tiền cần phải thu.Bạn có chắc muốn thêm không?',
  CONFIRM:
    'Sau khi xác nhận đơn hàng sẽ chuyển trạng thái và không thể thay đổi các thanh toán.',
  ADD: 'Bạn có muốn thêm không?',
  ERROR: 'Số tiền vượt quá số lượng cần trả. Không thực hiện được giao dịch.',
};

export const PAYMENT_STATUS = {
  DONE: 1,
  NO_PAYMENT: 2,
  REFUNDED: 3,
  WAITING_REFUND: 4,
};

export const CATEGORY = {
  PAY_ADDITIONALLY: 'Đóng thêm',
  REFUND: 'Hoàn trả',
};
