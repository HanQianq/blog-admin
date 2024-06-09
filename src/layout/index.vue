<template>
  <div class="app-layout-wrapper">
    <div class="side-bar-wrapper">
      <SideBar></SideBar>
    </div>
    <div class="main-wrapper flex-1 w-0 flex flex-col">
      <div class="top-bar-wrapper">
        <TopBar></TopBar>
      </div>
      <div class="content-wrapper flex-1 h-0">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SideBar from './components/SideBar/index.vue';
import TopBar from './components/TopBar/index.vue';
</script>
<style lang="scss" scoped>
.app-layout-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  .side-bar-wrapper {
    width: 240px;
  }
  .top-bar-wrapper {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
