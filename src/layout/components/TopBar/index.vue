<template>
  <div class="top-bar w-full h-full px-22px flex items-center justify-between">
    <div class="flex items-center">
      <div class="xy-center h-16">
        <span class="flex items-center">
          <FoldBtn></FoldBtn>
          <span
            class="font-title text-xl ml-5 flex-shrink-0 relative top-2px hover-text"
            @click="goBackToIndex"
          >
            博客后台管理系统
          </span>
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <UserInfo></UserInfo>
      <ShortcutEntrance class="ml-6"></ShortcutEntrance>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FoldBtn from './components/FoldBtn/index.vue';
import ShortcutEntrance from './components/ShortcutEntrance/index.vue';
import UserInfo from './components/UserInfo/index.vue';

const router = useRouter();

const goBackToIndex = () => {
  router.push({ name: 'Home' });
};
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
