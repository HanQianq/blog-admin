<template>
  <div class="article-column wh-full">
    <MySearchPanel :data-exist="dataList.length > 0" :loading="loading">
      <template #header>
        <div class="flex items-center">
          <el-input
            v-model="searchParams.name"
            class="!w-280px mr-4"
            placeholder="请输入关键词搜索"
            clearable
            @change="getDataListHandler"
          ></el-input>
          <el-button type="primary" @click="openDialog('add')"
            ><MyIcon name="plus" class="mr-1"></MyIcon>新增专栏</el-button
          >
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
          <el-table-column label="专栏封面" align="center">
            <template #default="{ row }">
              <img v-if="row.cover" :src="row.cover" class="w-50px h-40px" />
            </template>
          </el-table-column>
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
                <el-button link type="primary" @click="openDialog('edit', row)">
                  编辑
                </el-button>
                <el-button link type="danger" plain> 删除 </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <div class="p-4">
          <MyPagination
            :total="total"
            :page-number="pageConfig.pageNumber"
            :page-size="pageConfig.pageSize"
            @page-change="pageChangeHandler"
          ></MyPagination>
        </div>
      </template>
    </MySearchPanel>
  </div>
  <div v-if="formDialogProps.visible">
    <ColumnDialog
      :visible="formDialogProps.visible"
      :opt-type="formDialogProps.optType"
      :row="formDialogProps.row"
      @change-success="getDataListHandler"
      @close="closeDialog"
    ></ColumnDialog>
  </div>
</template>
<script lang="ts" setup>
import { getArticleColumnListApi } from '@/api/article/column';
import {
  ArticleColumnItemType,
  SearchArticleColumnType,
} from '@/api/article/column/type';
import ColumnDialog from './components/ColumnDialog.vue';
import { columnList } from './service';
import { useDialog } from '@/hooks/useDialog';
import { useSearch } from '@/hooks/useSearch';

const { formDialogProps, openDialog, closeDialog } =
  useDialog<ArticleColumnItemType>();

const originalParams = { name: '' };
const {
  searchParams,
  dataList,
  loading,
  total,
  pageConfig,
  getDataListHandler,
  pageChangeHandler,
} = useSearch<SearchArticleColumnType, ArticleColumnItemType>(
  originalParams,
  getArticleColumnList
);

async function getArticleColumnList() {
  const { data } = await getArticleColumnListApi({
    ...pageConfig,
    ...searchParams.value,
  });
  return data;
}

onMounted(async () => {
  await getDataListHandler();
});
</script>
<style lang="scss" scoped></style>
