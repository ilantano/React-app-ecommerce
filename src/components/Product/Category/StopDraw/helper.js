export const setDataCategoryStopDraw = (data) => ({
  product: data.product || '',
  startDate: data?.startDate || '',
  endDate: data?.endDate || '',
  pageSize: data?.pageSize ?? 10,
  pageNo: data?.pageNo || 1,
  columnName: data?.columnName || '',
  sortType: data?.sortType || '',
});
