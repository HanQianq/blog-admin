<template>
  <div class="side-bar w-full h-full flex flex-col">
    <div class="border-bottom xy-center h-16">
      <span
        class="flex items-center overflow-hidden hover-text"
        @click="goBackToIndex"
      >
        <MyIcon name="all-application" :size="18"></MyIcon>
        <span
          v-show="isSideExpand"
          class="font-title text-xl ml-2 flex-shrink-0 relative top-2px"
        >
          博客后台管理系统
        </span>
      </span>
    </div>
    <div class="flex-1 h-0" :class="{ 'is-collapse': !isSideExpand }">
      <el-menu :collapse="!isSideExpand">
        <div v-for="item in menuList" :key="item.id">
          <template v-if="item.type === 'fold'">
            <el-sub-menu :index="item.route" :key="item.id">
              <template #title>
                <MyIcon class="ml-1" size="20" :name="item.icon"></MyIcon>
                <span ml="5">{{ item.name }}</span>
              </template>

              <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="gotoRelatedPage(subItem)"
              >
                <template #title>
                  <MyIcon :name="subItem.icon"></MyIcon>
                  <span ml="4">{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item @click="gotoRelatedPage(item)">
              <MyIcon :name="item.icon" class="ml-1" size="20"></MyIcon>
              <template #title>
                <span ml="4">{{ item.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/store/system';
import { MenuItem, menuList } from '@/config/mock';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';

const { isSideExpand } = storeToRefs(useSystemStore());

const router = useRouter();

const goBackToIndex = () => {
  router.push({ name: 'Home' });
};

const gotoRelatedPage = (item: MenuItem) => {
  try {
    if (item.route) {
      router.push(item.route);
    }
  } catch (err) {
    return ElMessage.warning('该路由尚未添加');
  }
};
</script>
<style lang="scss" scoped>
.side-bar {
  border-right: solid 1px var(--sys-border-color);
  overflow: hidden;
  background-color: var(--sys-box-bg-color);
}
:deep(.el-menu) {
  border-right: none !important;
}
.is-collapse {
  :deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}
</style>
