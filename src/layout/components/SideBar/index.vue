<template>
  <div class="side-bar w-full h-full flex flex-col">
    <div class="border-bottom xy-center h-16">
      <span class="flex items-center overflow-hidden">
        <MyIcon name="all-application" :size="20"></MyIcon>
        <span
          v-show="isSideExpand"
          class="font-title text-lg ml-2 flex-shrink-0"
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
        <div v-for="item in menuList" :key="item.id">
          <template v-if="item.type === 'fold'">
            <a-sub-menu :key="item.id">
              <template v-if="item.icon" #icon>
                <MyIcon :name="item.icon"></MyIcon
              ></template>
              <template #title>{{ item.name }}</template>
              <a-menu-item
                v-for="subItem in item.children as MenuItem[]"
                :key="subItem.id"
                @click="gotoRelatedPage(subItem)"
              >
                <template v-if="subItem.icon" #icon>
                  <MyIcon :name="subItem.icon"></MyIcon>
                </template>

                {{ subItem.name }}
              </a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item @click="gotoRelatedPage(item)" :key="item.id">
              <template v-if="item.icon" #icon>
                <MyIcon :name="item.icon"></MyIcon
              ></template>
              {{ item.name }}
            </a-menu-item>
          </template>
        </div>
      </a-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/store/system';
import { MenuItem, menuList } from '@/config/mock';
import { storeToRefs } from 'pinia';
import { Message } from '@arco-design/web-vue';
const { isSideExpand } = storeToRefs(useSystemStore());

const onCollapse = (isCollapse: boolean) => {
  isSideExpand.value = !isCollapse;
};

const router = useRouter();
const gotoRelatedPage = (item: MenuItem) => {
  try {
    if (item.route) {
      router.push(item.route);
    }
  } catch (err) {
    return Message.warning('该路由尚未添加');
  }
};
</script>
<style lang="scss" scoped>
.side-bar {
  border-right: solid 1px var(--sys-border-color);
  overflow: hidden;
  background-color: var(--sys-box-bg-color);
}
</style>
