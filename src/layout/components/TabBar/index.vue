<template>
  <div
    v-if="visible"
    ref="parentRef"
    class="h-full tab-bar flex flex-nowrap items-center relative border-bottom"
  >
    <div
      v-if="isShowBtn"
      class="scroll-left hover-text border-right"
      title="向左滑动"
      @click="clickLeftHandle"
    >
      <icon-left theme="outline" size="16" class="flex items-center" />
    </div>
    <div
      ref="scrollRef"
      class="tab-bar-wrapper pr-8 flex flex-no-wrap items-center overflow-hidden relative"
    >
      <TabItem
        v-for="(item, ind) in tabList"
        :key="item.id"
        :item="item"
        :ind="ind"
      ></TabItem>
    </div>
    <div
      v-if="isShowBtn"
      class="scroll-right ml-3 hover-text border-left"
      title="向右滑动"
      @click="clickRightHandle"
    >
      <icon-right theme="outline" size="16" class="flex items-center" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTabListStore } from '@/store/tab/tabList';
import { useScroll } from '@/hooks/useScroll';
import { storeToRefs } from 'pinia';
import TabItem from './components/TabItem.vue';

const { tabList, visible } = storeToRefs(useTabListStore());
const { scrollRef, parentRef, isShowBtn, clickLeftHandle, clickRightHandle } =
  useScroll(200);
</script>
<style lang="scss" scoped>
.tab-bar {
  height: 3rem;

  .scroll-left,
  .scroll-right {
    padding: 0 8px;
    cursor: pointer;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-wrapper {
    scroll-behavior: smooth;
  }
}
:deep(.el-divider--vertical) {
  width: 2px;
  border-left-width: 2px;
}
</style>
