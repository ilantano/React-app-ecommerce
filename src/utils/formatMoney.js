export function formatMoney(values) {
  return values?.toString().replace(/\D/g, '');
}
export function formatNumberToMoney(values) {
  return values?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
