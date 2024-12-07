import { getDictListApi } from '@/api/system/dict';
import type { DictItemType } from '@/api/system/dict/type';

export const useDict = (code: string) => {
  const dictDataList = ref<DictItemType[]>([]);
  const getDictDataList = async () => {
    const { data } = await getDictListApi({ code });
    dictDataList.value = data;
  };
  return { dictDataList, getDictDataList };
};
