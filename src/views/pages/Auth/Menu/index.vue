<template>
  <div class="">
    <div
      class="header-wrapper p-4 border-bottom flex justify-between items-center"
    >
      <el-button type="primary" @click="openDrawer"> 新增菜单 </el-button>
    </div>
    <MenuFormDrawer ref="drawerRef"></MenuFormDrawer>
  </div>
</template>
<script lang="ts" setup>
import MenuFormDrawer from './components/MenuFormDrawer.vue';

const drawerRef = ref();
const openDrawer = () => {
  drawerRef.value.openDrawerHandler();
};
</script>
<style lang="scss" scoped></style>
