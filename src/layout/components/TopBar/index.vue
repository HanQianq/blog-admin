<template>
  <div class="top-bar w-full h-full px-4 flex items-center justify-between">
    <div>
      <FoldBtn></FoldBtn>
    </div>
    <div class="flex items-center">
      <ShortcutEntrance class="mr-6"></ShortcutEntrance>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FoldBtn from './components/FoldBtn/index.vue';
import ShortcutEntrance from './components/ShortcutEntrance/index.vue';
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
