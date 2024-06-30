<template>
  <div class="top-bar w-full h-full px-4 flex items-center justify-between">
    <div></div>
    <div>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserInfo from './components/UserInfo/index.vue';
</script>
<style lang="scss" scoped>
.top-bar {
  border-bottom: solid 1px var(--sys-border-color);
  background-color: var(--sys-box-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--sys-text-color);
}
</style>
