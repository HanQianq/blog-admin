<template>
  <div class="app-layout-wrapper">
    <div class="side-bar-wrapper" :style="{ width: sideWidth }">
      <SideBar></SideBar>
    </div>
    <div class="main-wrapper flex-1 w-0 flex flex-col">
      <div class="flex flex-col">
        <div class="h-12">
          <TabBar></TabBar>
        </div>

        <div class="top-bar-wrapper">
          <TopBar></TopBar>
        </div>
      </div>
      <div class="content-wrapper flex-1 h-0">
        <div v-if="isOpenStore" class="wh-full">
          <RouterView v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </RouterView>
        </div>
        <div v-else class="wh-full">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import SideBar from './components/SideBar/index.vue';
import TopBar from './components/TopBar/index.vue';
import TabBar from './components/TabBar/index.vue';
import { useSystemStore } from '@/store/system';

const { isSideExpand, isOpenStore } = storeToRefs(useSystemStore());

const sideWidth = computed(() => {
  return isSideExpand.value ? '14rem' : '4rem';
});
</script>
<style lang="scss" scoped>
.app-layout-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;

  .side-bar-wrapper {
    transition: all ease 0.2s;
  }

  .top-bar-wrapper {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
