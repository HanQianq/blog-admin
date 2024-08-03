<template>
  <div class="icon-manage bg-white">
    <div class="header-wrapper p-4 flex justify-between items-center">
      <div class="flex items-center">
        <el-input placeholder="输入名称搜索" class="mr-4"></el-input>
        <el-select></el-select>
      </div>

      <el-segmented v-model="currentLayout" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
const currentLayout = ref('card');
const options = [
  {
    label: '卡片',
    value: 'card',
  },
  {
    label: '简洁',
    value: 'simple',
  },
];
</script>
<style scoped lang="scss"></style>
