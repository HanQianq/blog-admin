<template>
  <div class="">
    <el-drawer
      :model-value="visible"
      title="菜单管理"
      :size="500"
      :lock-scroll="false"
      :before-close="closeDrawerHandler"
    >
      <el-form label-width="100px" ref="formRef">
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
        <el-form-item prop="type" label="菜单类型">
          <el-radio-group>
            <el-radio value="1" size="small" border>目录</el-radio>
            <el-radio value="2" size="small" border>菜单</el-radio>
            <el-radio value="3" size="small" border>TAB</el-radio>
            <el-radio value="4" size="small" border>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="level" label="菜单层级">
          <el-radio-group>
            <el-radio value="1" size="small" border>一级</el-radio>
            <el-radio value="2" size="small" border>二级</el-radio>
            <el-radio value="3" size="small" border>三级</el-radio>
            <el-radio value="4" size="small" border>四级</el-radio>
          </el-radio-group>
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
const visible = ref(false);

const openDrawerHandler = () => {
  visible.value = true;
};
const closeDrawerHandler = () => {
  visible.value = false;
};

defineExpose({
  openDrawerHandler,
});
const formRef = ref();
</script>
<style lang="scss" scoped></style>
