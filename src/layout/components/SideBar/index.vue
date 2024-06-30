<template>
  <div class="side-bar w-full h-full flex flex-col">
    <div class="border-bottom xy-center h-16">
      <span class="flex items-center overflow-hidden">
        <MyIcon name="all-application" :size="18"></MyIcon>
        <span
          v-show="isSideExpand"
          class="font-title text-base ml-2 flex-shrink-0"
          >博客后台管理系统</span
        >
      </span>
    </div>
    <div class="flex-1 h-0">
      <a-menu
        :style="{ width: '100%', height: '100%' }"
        show-collapse-button
        :default-collapsed="!isSideExpand"
        @collapse="onCollapse"
      >
        <a-sub-menu key="0">
          <template #icon> <MyIcon name="rss"></MyIcon></template>
          <template #title>权限管理</template>
          <a-menu-item key="0_0">菜单管理</a-menu-item>
          <a-menu-item key="0_1">接口管理</a-menu-item>
          <a-menu-item key="0_2">角色管理</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="1">
          <template #icon><MyIcon name="user"></MyIcon></template
          >用户管理</a-menu-item
        >
      </a-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/system';

import { storeToRefs } from 'pinia';
const { isSideExpand } = storeToRefs(useSystemStore());

const onCollapse = (isCollapse: boolean) => {
  isSideExpand.value = !isCollapse;
};
</script>
<style lang="scss" scoped>
.side-bar {
  border-right: solid 1px var(--sys-border-color);
  overflow: hidden;
  background-color: var(--sys-box-bg-color);
}
</style>
