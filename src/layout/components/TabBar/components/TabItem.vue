<template>
  <div class="tab-item">
    <el-dropdown
      trigger="contextmenu"
      placement="bottom-start"
      :hide-on-click="true"
    >
      <span
        class="tag-item hover-weak-wrapper rounded-lg pl-2 pr-6px"
        :class="{ 'weak-active-item': currentTab.id === item.id }"
        @click="selectTabItem(ind)"
      >
        <MyIcon :name="item.icon" class="mr-2"></MyIcon>
        <span class="flex-1">{{ item.name }}</span>
        <MyIcon
          v-if="item.id !== 'Home'"
          name="close"
          size="10"
          class="hover-wrapper p-2px rounded-sm"
          @click.stop="closeTag(item)"
        ></MyIcon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(menuItem, index) in menuList"
            :key="index"
            :disabled="menuItem.disabled(item, ind)"
            @click="menuItem.fn(item)"
          >
            {{ menuItem.title }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { useTabListStore } from '@/store/tab/tabList';
import { storeToRefs } from 'pinia';
import type { TabItem } from '@/types/type';

type PropsType = {
  item: TabItem;
  ind: number;
};
defineProps<PropsType>();

const {
  closeTag,

  selectTabItem,
  closeBeforeTag,
  closeAfterTag,
  closeOtherTag,
} = useTabListStore();

const { currentTab, tabList } = storeToRefs(useTabListStore());
const menuList = ref([
  {
    title: '关闭标签页',
    disabled: (item: TabItem, _ind: number) => item.id === 'Home',
    fn: (item: TabItem) => {
      closeTag(item);
    },
  },
  {
    title: '关闭左侧标签页',
    fn: (item: TabItem) => {
      closeBeforeTag(item);
    },
    disabled: (_item: TabItem, index: number) => index < 2,
  },
  {
    title: '关闭右侧标签页',
    fn: (item: TabItem) => {
      closeAfterTag(item);
    },
    disabled: (_item: TabItem, index: number) =>
      index === tabList.value.length - 1,
  },
  {
    title: '关闭其他标签页',
    fn: (item: TabItem) => {
      closeOtherTag(item);
    },
    disabled: (_item: TabItem, index: number) => {
      const flag =
        tabList.value.some((item) => item.id === 'Home') && index !== 0;
      return tabList.value.length === 1 || flag;
    },
  },
]);
</script>
<style lang="scss" scoped>
.tab-item {
  flex-shrink: 0;
}
.tag-item {
  width: 150px;
  font-size: 12px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-shrink: 0;
  cursor: pointer;
  transition: all linear 0.2s;

  .close-icon {
    transform: scale(0.7, 0.7);
    padding: 3px;
    border-radius: 4px;
    transition: all 0.15s linear;

    &:hover {
      transform: scale(0.8);
    }
  }
}
</style>
