<template>
  <div class="">
    <el-drawer
      :model-value="visible"
      ref="formRef"
      title="菜单管理"
      :size="400"
    >
      <el-form label-width="100px">
        <el-form-item prop="name" label="菜单名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="code" label="菜单码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="route" label="菜单路由">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="father" label="父菜单">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="level" label="菜单层级">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="color" label="菜单颜色">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="color" label="菜单图标">
          <SelectIcon></SelectIcon>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
type PropsType = { visible: boolean };
defineProps<PropsType>();

const formRef = ref();
</script>
<style lang="scss" scoped></style>
