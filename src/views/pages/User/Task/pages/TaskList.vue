<template>
  <div class="wh-full">
    <MySearchPanel
      :data-exist="dataList.length > 0"
      :loading="loading"
      hide-header
    >
      <template #footer>
        <MyPagination
          :total="total"
          :page-number="pageConfig.pageNumber"
          :page-size="pageConfig.pageSize"
          @page-change="pageChangeHandler"
        ></MyPagination>
      </template>
      <ul class="list-content-wrapper mb-4">
        <li v-for="item in dataList" :key="item.id">
          <UserTaskCard :task="item" />
        </li>
      </ul>
    </MySearchPanel>
  </div>
</template>
<script lang="ts" setup>
import { getUserTaskListApi } from '@/api/user/task';
import { UserTaskItemType, UserTaskSearchType } from '@/api/user/task/type';
import { useSearch } from '@/hooks/useSearch';
import UserTaskCard from '../components/UserTaskCard.vue';

const originalParams: UserTaskSearchType = { title: '' };
const {
  searchParams,
  dataList,
  loading,
  total,
  pageConfig,
  getDataListHandler,
  pageChangeHandler,
} = useSearch<UserTaskSearchType, UserTaskItemType>(
  originalParams,
  getUserTaskList
);

async function getUserTaskList() {
  const { data } = await getUserTaskListApi({
    ...pageConfig,
    ...searchParams.value,
  });
  data.result = data.result.map((item: UserTaskItemType) => {
    const taskItem: UserTaskItemType = {
      ...item,
      createTime: fmtTime(item.createTime, 'YYYY-MM-DD'),
      updateTime: fmtTime(item.updateTime),
    };
    return taskItem;
  });
  return data;
}
const filterUserTaskList = async () => {
  pageConfig.pageNumber = 1;
  await getDataListHandler();
};

onMounted(() => {
  getDataListHandler();
});
</script>
<style lang="scss" scoped>
.list-content-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
