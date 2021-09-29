export const setDataGetListProducts = (data) => ({
  statusOrderId: data?.statusOrderId || [],
  statusTicketId: data?.statusTicketId || [],
  keyWord: data?.keyWord?.trim() || '',
  startDate: data?.startDate || '',
  endDate: data?.endDate || '',
  pageSize: data?.pageSize ?? 10,
  pageNo: data?.pageNo || 1,
  columnName: data?.columnName || '',
  sortType: data?.sortType || '',
  sortValueOrder: '',
});

export const OPTION_KEY = {
  id: 'id',
  name: 'name',
};
