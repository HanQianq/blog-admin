<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSystemStore } from './store/system';

const { mode } = storeToRefs(useSystemStore());
</script>

<template>
  <div class="app"><router-view></router-view><SysSettings></SysSettings></div>
</template>

<style lang="scss" scoped>
.app {
  color: var(--sys-text-color);
  background-color: var(--sys-bg-color);
}
</style>
