<template>
  <div class="">
    <div
      class="header-wrapper p-4 border-bottom flex justify-between items-center"
    >
      <el-button type="primary" @click="openDrawer"> 新增菜单 </el-button>
    </div>
    <MenuFormDrawer
      @add-success="getMenuTreeListHandler"
      ref="drawerRef"
    ></MenuFormDrawer>
  </div>
</template>
<script lang="ts" setup>
import { MenuItemType } from '@/api/authority/menu/type';
import MenuFormDrawer from './components/MenuFormDrawer.vue';
import { getAllMenuTreeApi } from '@/api/authority/menu';

const drawerRef = ref();
const openDrawer = () => {
  drawerRef.value.openDrawerHandler();
};

const menuTreeList = ref<MenuItemType[]>([]);

const getMenuTreeListHandler = async () => {
  const res = await getAllMenuTreeApi();
  menuTreeList.value = res.data;
};

onMounted(() => {
  getMenuTreeListHandler();
});
</script>
<style lang="scss" scoped></style>
