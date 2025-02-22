<template>
  <el-tabs
    v-model="activeTab"
    class="wh-full flex flex-col"
    @tab-click="gotoRelatedPage"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.key"
      :label="item.label"
      :name="item.key"
      class="wh-full"
      lazy
    >
      <RouterView></RouterView>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { TabsPaneContext } from 'element-plus';

const route = useRoute();
const router = useRouter();
const activeTab = computed(() => route.name);
const tabList = [
  {
    label: '图片库',
    key: 'ImageLib',
  },
  {
    label: '图片分类',
    key: 'ImageCategory',
  },
];

const gotoRelatedPage = (tab: TabsPaneContext) => {
  const routerName = tabList.find((el) => el.label === tab.props.label);
  router.push({ name: routerName?.key });
};
</script>
<style scoped lang="scss">
:deep(.el-tabs__content) {
  flex: 1;
  height: 0;
}
</style>
