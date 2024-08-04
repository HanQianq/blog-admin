<template>
  <el-popover
    ref="popoverRef"
    placement="bottom"
    :width="500"
    trigger="click"
    class="select-icon"
  >
    <template #reference>
      <el-button type="primary">选择图标</el-button>
    </template>
    <div v-loading="loading">
      <div class="flex mb-4">
        <el-input
          v-model="searchParams.name"
          placeholder="请输入名称"
          class="!w-200px mr-4"
          clearable
        >
        </el-input>
        <el-select
          v-model="searchParams.category"
          class="!w-200px mr-4"
          placeholder="请选择图标类型"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button
          :icon="Search"
          type="primary"
          @click="filterIconList"
        ></el-button>
      </div>
      <ul class="icon-wrapper h-full w-full mb-4">
        <li
          v-for="item in dataList"
          :key="item.id"
          class="h-16"
          :class="{ 'active-item': currentIcon?.id === item.id }"
          @click="selectIcon(item)"
        >
          <IconCardItem :item="item" layout="card"></IconCardItem>
        </li>
      </ul>
      <MyPagination
        :total="total"
        :page-number="pageConfig.pageNumber"
        :page-size="pageConfig.pageSize"
        hide-jump
        hide-size
        @changePagination="pageChangeHandler"
      ></MyPagination>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
import { getIconListApi } from '@/api/resource/icon';
import { useSearch } from '@/hooks/useSearch.ts';
import { Search } from '@element-plus/icons-vue';
import { CategoryItemType } from '@/api/resource/type';
import { IconItemType, IconSearchType } from '@/api/resource/icon/type';
import IconCardItem from '@/views/pages/Resource/Icon/components/IconCardItem.vue';

const emits = defineEmits(['confirm']);

const categoryList = ref<CategoryItemType[]>([]);
const originalParams: IconSearchType = { name: '', category: '' };

const {
  searchParams,
  dataList,
  loading,
  total,
  pageConfig,
  getDataListHandler,
  pageChangeHandler,
} = useSearch<IconSearchType, IconItemType>(originalParams, getIconList);

async function getIconList() {
  const { data } = await getIconListApi({
    ...pageConfig,
    ...searchParams.value,
  });
  return data;
}
const filterIconList = async () => {
  pageConfig.pageNumber = 1;
  await getDataListHandler();
};

const initIconList = async () => {
  searchParams.value = { ...originalParams };
  filterIconList();
  getDataListHandler();
};

const popoverRef = ref();
const hidePopover = () => {
  popoverRef.value.hide();
};
const currentIcon = ref<IconItemType | null>(null);
const selectIcon = (item: IconItemType) => {
  currentIcon.value = item;
  hidePopover();
  emits('confirm', item);
};

onBeforeMount(() => {
  initIconList();
});
</script>
<style lang="scss" scoped>
.icon-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-content: start;
  gap: 16px;
}
</style>
