<template>
  <div class="article-category wh-full">
    <MySearchPanel
      :data-exist="categoryList.length > 0"
      :loading="loading"
      hide-bottom
    >
      <template #header>
        <div>
          <el-button type="primary" @click="openDialog('add')"
            ><MyIcon name="plus" class="mr-1"></MyIcon>新增分类</el-button
          >
        </div>
      </template>
      <div class="p-4">
        <el-table
          :data="categoryList"
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
                  v-if="!row.father"
                  link
                  type="primary"
                  @click="openDialog('add', row)"
                >
                  新增子分类
                </el-button>
                <el-button link type="primary" @click="openDialog('edit', row)">
                  编辑
                </el-button>
                <el-button link type="danger" plain> 删除 </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </MySearchPanel>
  </div>
  <div v-if="formDialogProps.visible">
    <CategoryDialog
      :visible="formDialogProps.visible"
      :opt-type="formDialogProps.optType"
      :row="formDialogProps.row"
      @change-success="getCategoryTree"
      @close="closeDialog"
    ></CategoryDialog>
  </div>
</template>
<script lang="ts" setup>
import { getAllArticleCategoryTreeApi } from '@/api/article/category';
import { ArticleCategoryItemType } from '@/api/article/category/type';
import CategoryDialog from './components/CategoryDialog.vue';
import { columnList, fmtResData } from './service';
import { useDialog } from '@/hooks/useDialog';

const categoryList = ref<ArticleCategoryItemType[]>([]);
const loading = ref(true);

const { formDialogProps, openDialog, closeDialog } =
  useDialog<ArticleCategoryItemType>();

const getCategoryTree = async () => {
  try {
    loading.value = true;
    const res = await getAllArticleCategoryTreeApi();
    categoryList.value = fmtResData(res.data);
  } catch (error) {
    categoryList.value = [];
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onBeforeMount(() => {
  getCategoryTree();
});
</script>
<style lang="scss" scoped></style>
