export function convertNumberToCurrency(data) {
  return data
    ? `${data?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ`
    : '0đ';
}

export function convertNumberToPercent(data) {
  return data
    ? `${data?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}%`
    : '0.00%';
}

export function convertString(convert) {
  return convert && convert?.replace(/\s/g, '');
}

export const DATE_FORMAT = {
  DAY_MONTH_YEAR: 'DD/MM/YYYY',
  DAY_MONTH_YEAR_STRIKETHROUGH: 'DD-MM-YYYY',
  YEAR_MONTH_DAY: 'YYYY/MM/DD',
  YEAR_MONTH_DAY_STRIKETHROUGH: 'YYYY-MM-DD',
};
