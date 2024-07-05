<template>
  <div class="w-full h-full">
    <a-table :columns="columnList" :data="dataList" />
  </div>
</template>
<script lang="ts" setup>
type PropsType = {
  dataList?: any[];
  columnList: any[];
};

withDefaults(defineProps<PropsType>(), {
  dataList: (): any[] => [],
});
</script>
<style lang="scss" scoped></style>
