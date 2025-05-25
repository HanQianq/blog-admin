<template>
  <div
    class="inline-block px-2 text-xs rounded min-w-50px h-6 leading-6"
    :style="{ 'background-color': `${chroma(color).alpha(0.1).css()}`, color }"
  >
    <span v-if="name"></span> {{ name }}
  </div>
</template>
<script lang="ts" setup>
import chroma from 'chroma-js';
defineProps<{ name?: string; color: string }>();
</script>
<style lang="scss" scoped></style>
