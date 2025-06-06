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
            <el-tag size="large" class="mr-4">文章类别</el-tag>
            <el-tree-select
              v-model="searchParams.category"
              :data="categoryList"
              node-key="id"
              clearable
              check-strictly
              filterable
              :props="{ label: 'name' }"
              class="!w-280px"
              @change="changeCategory"
            />
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
          v-if="currentLayout === 'list'"
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
          <el-table-column label="文章封面" align="center">
            <template #default="{ row }">
              <img v-if="row.cover" :src="row.cover" class="w-50px h-40px" />
            </template>
          </el-table-column>
          <el-table-column label="作者" align="center">
            <template #default="{ row }">
              <div>{{ row.author }}</div>
            </template>
          </el-table-column>
          <el-table-column label="类别" align="center">
            <template #default="{ row }">
              <div>{{ row.category }}</div>
            </template>
          </el-table-column>
          <el-table-column label="文章状态" align="center">
            <template #default="{ row }">
              <MyTag
                :name="row.status === 'draft' ? '草稿' : '正文'"
                :color="row.status === 'draft' ? 'gray' : 'green'"
              ></MyTag>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" align="center">
            <template #default="{ row }">
              <div>{{ row.createTime }}</div>
            </template>
          </el-table-column>
          <el-table-column label="最近更新时间" align="center">
            <template #default="{ row }">
              <div>{{ row.updateTime }}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            width="250"
            align="center"
          >
            <template #default="{ row }">
              <div flex w-full class="justify-center">
                <el-button
                  v-if="row.cover"
                  link
                  type="primary"
                  @click="gotoArticleDetail(row.id)"
                >
                  查看详情
                </el-button>
                <el-button
                  link
                  type="primary"
                  @click="gotoUpdateArticle(row.id)"
                >
                  编辑
                </el-button>
                <el-button
                  link
                  type="danger"
                  @click="deleteArticleHandler(row.id)"
                >
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <ul v-else class="article-list-wrapper">
          <li
            class="article-item-wrapper"
            v-for="item in dataList"
            :key="item.id"
          >
            <ArticleCard
              :article="item"
              @delete="deleteArticleHandler"
              @edit="gotoUpdateArticle"
              @view="gotoArticleDetail"
            ></ArticleCard>
          </li>
        </ul>
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
import { deleteArticleApi, getArticleListApi } from '@/api/article';
import { ArticleListItemType, ArticleQueryType } from '@/api/article/type';
import { useArticleCategory } from '../../hooks/useArticle';
import { useSearch } from '@/hooks/useSearch';
import { columnList } from './service';
import { fmtTime } from '@/utils/tool';
import ArticleCard from './components/ArticleCard.vue';

const router = useRouter();
const { categoryList, getCategoryTree } = useArticleCategory();
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
} = useSearch<ArticleQueryType, ArticleListItemType>(
  originalParams,
  getArticleList
);

async function getArticleList() {
  const { data } = await getArticleListApi({
    ...pageConfig,
    ...searchParams.value,
  });
  data.result = data.result.map((item: any) => {
    const articleItem: ArticleListItemType = {
      id: item.id,
      title: item.title,
      abstract: item.abstract,
      cover: item.cover,
      author: item.author.name,
      status: item.status,

      category: item.category
        ? item.category.father + '·' + item.category.name
        : '',
      createTime: fmtTime(item.createTime, 'YYYY-MM-DD'),
      updateTime: fmtTime(item.updateTime),
    };
    return articleItem;
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

const deleteArticleHandler = (id: string) => {
  confirmHandler('您将和删除这篇文章', async () => {
    const res = await deleteArticleApi(id);
    if (res) {
      ElMessage.success('删除成功');
      await initArticleList();
    }
  });
};

const gotoArticleDetail = (id: string) => {
  router.push({
    name: 'ArticleDetail',
    query: { id },
  });
};

const gotoUpdateArticle = (id: string) => {
  router.push({
    name: 'UpdateArticle',
    query: { id },
  });
};

onMounted(() => {
  getCategoryTree();
  initArticleList();
});
</script>
<style lang="scss" scoped>
.article-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-content: start;
  gap: 1rem;
}
</style>
