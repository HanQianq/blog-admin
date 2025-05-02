<template>
  <div class="wh-full">
    <MySearchPanel :data-exist="dataList.length > 0" :loading="loading">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-tag size="large" class="mr-4">文章标题</el-tag>
            <el-input
              v-model="searchParams.title"
              class="!w-280px mr-4"
              placeholder="请输入关键词搜索"
              clearable
              @change="getDataListHandler"
            ></el-input>
          </div>
          <el-segmented v-model="currentLayout" :options="options">
            <template #default="{ item }">
              <div class="xy-center">
                <my-icon :name="item.icon" size="16"> </my-icon>
              </div>
            </template>
          </el-segmented>
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
          <el-table-column
            v-for="item in columnList"
            :key="item.prop"
            :prop="item.prop"
            :label="item.title"
            align="center"
          ></el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            width="250"
            align="center"
          >
            <template #default="{ row }">
              <div flex w-full class="justify-center">
                <el-button
                  link
                  type="primary"
                  @click="gotoArticleDetail(row.id)"
                >
                  查看详情
                </el-button>
                <el-button link type="danger"> 删除 </el-button>
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
import { getArticleListApi } from '@/api/article';
import { ArticleItemType, ArticleQueryType } from '@/api/article/type';
import { useSearch } from '@/hooks/useSearch';
import { columnList } from './service';

const router = useRouter();
const currentLayout = ref('list');
const options = [
  {
    label: '列表',
    value: 'list',
    icon: 'view-grid-list',
  },
  {
    label: '卡片',
    value: 'card',
    icon: 'view-grid-card',
  },
];

const originalParams: ArticleQueryType = { title: '', category: '' };

const {
  searchParams,
  dataList,
  loading,
  total,
  pageConfig,
  getDataListHandler,
  pageChangeHandler,
} = useSearch<ArticleQueryType, ArticleItemType>(
  originalParams,
  getArticleList
);

async function getArticleList() {
  const { data } = await getArticleListApi({
    ...pageConfig,
    ...searchParams.value,
  });
  return data;
}
const filterArticleList = async () => {
  pageConfig.pageNumber = 1;
  await getDataListHandler();
};

const changeCategory = async (category: string) => {
  searchParams.value.category = category;
  await filterArticleList();
};

const initArticleList = async () => {
  searchParams.value = { ...originalParams };
  await filterArticleList();
};

const gotoArticleDetail = (id: number) => {
  router.push({
    name: 'ArticleDetail',
    query: {
      id,
    },
  });
};

onMounted(() => {
  initArticleList();
});
</script>
<style lang="scss" scoped></style>
