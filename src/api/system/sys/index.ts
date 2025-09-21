import type { StatEnum } from '@/types/sys/enum';
import request from '@/utils/request';
export const getSysStatApi = (data: {
  type: StatEnum;
  rangeType: 'month' | 'week';
}) => request.post<StatItemType>('/sys/stat', data);
