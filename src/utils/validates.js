export function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export const validatePromotionCode = (promotionCode) => {
  const regex = /^([A-Z-0-9]){7}$/;
  if (promotionCode) {
    return regex.test(promotionCode);
  }
  return true;
};

export const validateMaxDiscount = (discount) => {
  const regex = /^[0-9]*$/g;
  if (discount) {
    return regex.test(discount);
  }
  return true;
};

export const validatePhoneNumber = (numbers) => {
  const regex = /^((09|03|07|08|05|02)+([0-9]{8}))$/g;
  if (numbers) {
    return regex.test(numbers);
  }
  return true;
};

export const validatePassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (password) {
    return regex.test(password);
  }
  return true;
};
