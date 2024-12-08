import { getAvailableDictListApi } from '@/api/system/dict';
import type { DictSimpleItemType } from '@/api/system/dict/type';

export const useDict = (code: string) => {
  const dictDataList = ref<DictSimpleItemType[]>([]);
  const getDictDataList = async () => {
    const { data } = await getAvailableDictListApi({ code });
    dictDataList.value = data;
  };
  return { dictDataList, getDictDataList };
};
