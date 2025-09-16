import request from '@/utils/request';
export const getSysStatApi = () =>
  request.post<{ article: StatItemType; user: StatItemType }>('/sys/stat');
