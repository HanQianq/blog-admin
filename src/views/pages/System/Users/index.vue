<template>
  <div class="wh-full">
    <MySearchPanel :data-exist="dataList.length > 0" :loading="loading">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-tag size="large" class="mr-4">用户昵称</el-tag>
            <el-input
              v-model="searchParams.keyword"
              class="!w-280px mr-4"
              placeholder="请输入关键词搜索"
              clearable
              @change="getDataListHandler"
            ></el-input>
            <el-tag size="large" class="mr-4">用户角色</el-tag>
            <el-select
              v-model="searchParams.roleId"
              clearable
              filterable
              class="!w-280px"
              @change="changeRole"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </template>
      <div class="p-4">
        <el-table
          :data="dataList"
          style="width: 100%"
          row-key="id"
          size="large"
          border
          default-expand-all
        >
          <!-- <el-table-column
            v-for="item in columnList"
            :key="item.prop"
            :prop="item.prop"
            :label="item.title"
            align="center"
          ></el-table-column> -->
          <el-table-column label="基本信息" align="center">
            <template #default="{ row }">
              <div class="xy-center">
                <img
                  v-if="row.avatar"
                  :src="row.avatar"
                  class="w-8 h-8 mr-4 rounded-full"
                />
                <span>{{ row.nickName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template #default="{ row }">
              <div>{{ row.createTime }}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            width="250"
            align="center"
          >
            <template #default>
              <div flex w-full class="justify-center">
                <el-button link type="primary"> 分配角色 </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #bottom>
        <MyPagination
          :total="total"
          :page-number="pageConfig.pageNumber"
          :page-size="pageConfig.pageSize"
          @page-change="pageChangeHandler"
        ></MyPagination>
      </template>
    </MySearchPanel>
  </div>
</template>
<script lang="ts" setup>
import { getUserListApi } from '@/api/system/user';
import { UserItemType, UserListQueryType } from '@/api/system/user/type';
import { useSearch } from '@/hooks/useSearch';
// import { columnList } from './service';
// import { fmtTime } from '@/utils/tool';
import { RoleItemType } from '@/api/authority/role/type';
import { getRoleListApi } from '@/api/authority/role';

const roleList = ref<RoleItemType[]>([]);

const getRoleList = async () => {
  try {
    loading.value = true;
    const { data } = await getRoleListApi();
    roleList.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const originalParams: UserListQueryType = { keyword: '', roleId: '' };

const {
  searchParams,
  dataList,
  loading,
  total,
  pageConfig,
  getDataListHandler,
  pageChangeHandler,
} = useSearch<UserListQueryType, UserItemType>(originalParams, getUserList);

async function getUserList() {
  const { data } = await getUserListApi({
    ...pageConfig,
    ...searchParams.value,
  });

  return data;
}
const filterUserList = async () => {
  pageConfig.pageNumber = 1;
  await getDataListHandler();
};

const changeRole = async (role: string) => {
  searchParams.value.roleId = role;
  await filterUserList();
};

const initUserList = async () => {
  searchParams.value = { ...originalParams };
  await filterUserList();
};

onMounted(() => {
  getRoleList();
  initUserList();
});
</script>
<style lang="scss" scoped></style>
