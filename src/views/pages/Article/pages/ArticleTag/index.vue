<template>
  <div class="article-tag wh-full">
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
            >新增标签</el-button
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
          <el-table-column
            v-for="item in columnList"
            :key="item.prop"
            :prop="item.prop"
            :label="item.title"
            align="center"
          ></el-table-column>
          <el-table-column prop="color" align="center" label="颜色">
            <template #default="{ row }">
              <div class="xy-center">
                <div
                  class="w-32px h-32px rounded-full"
                  :style="{
                    background: `${row.color}`,
                  }"
                ></div>
              </div>
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
                <el-button link type="primary" @click="openDialog('edit', row)">
                  编辑
                </el-button>
                <el-button link type="danger" plain> 删除 </el-button>
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
  <div v-if="formDialogProps.visible">
    <TagDialog
      :visible="formDialogProps.visible"
      :opt-type="formDialogProps.optType"
      :row="formDialogProps.row"
      @change-success="getDataListHandler"
      @close="closeDialog"
    ></TagDialog>
  </div>
</template>
<script lang="ts" setup>
import { getArticleTagListApi } from '@/api/article/tag';
import {
  ArticleTagItemType,
  SearchArticleTagType,
} from '@/api/article/tag/type';
import TagDialog from './components/TagDialog.vue';
import { columnList } from './service';
import { useDialog } from '@/hooks/useDialog';
import { useSearch } from '@/hooks/useSearch';

const { formDialogProps, openDialog, closeDialog } =
  useDialog<ArticleTagItemType>();

const originalParams = { name: '' };
const {
  searchParams,
  dataList,
  loading,
  total,
  pageConfig,
  getDataListHandler,
  pageChangeHandler,
} = useSearch<SearchArticleTagType, ArticleTagItemType>(
  originalParams,
  getArticleTagList
);

async function getArticleTagList() {
  const { data } = await getArticleTagListApi({
    ...pageConfig,
    ...searchParams.value,
  });
  return data;
}

onMounted(() => {
  getDataListHandler();
});
</script>
<style lang="scss" scoped></style>
