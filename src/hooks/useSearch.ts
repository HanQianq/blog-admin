export const useSearch = <T, K>(
  originalParams: T,
  cb: () => Promise<ResPageType<K>>
) => {
  const searchParams = ref<T>({
    ...originalParams,
  });
  const storageParams = ref<T>({
    ...originalParams,
  });
  const dataList = ref<K[]>([]);
  const pageConfig = reactive({
    pageNumber: 1,
    pageSize: 10,
  });
  const loading = ref(true);
  const total = ref(0);
  const getDataListHandler = async () => {
    loading.value = true;
    storageParams.value = searchParams.value;
    const { total: totalCount, result } = await cb();
    total.value = totalCount;
    dataList.value = result as any[];
    loading.value = false;
  };
  const pageChangeHandler = async ({ pageNumber, pageSize }: PageType) => {
    pageConfig.pageNumber = pageNumber;
    searchParams.value = storageParams.value;
    pageConfig.pageSize = pageSize;
    getDataListHandler();
  };
  return {
    searchParams,
    dataList,
    pageConfig,
    loading,
    total,
    getDataListHandler,
    pageChangeHandler,
  };
};
