<script setup lang="ts"></script>

<template>
  <div class="app">
    <SysSettings></SysSettings>
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss" scoped>
.app {
  color: var(--sys-text-color);
}
</style>
