<template>
  <div
    class="inline-block text-center text-xs rounded min-w-50px h-6 leading-6"
    :style="{
      'background-color': `${chroma(color)
        .alpha(opacity || 0.1)
        .css()}`,
      color,
    }"
  >
    <span v-if="name"></span> {{ name }}
  </div>
</template>
<script lang="ts" setup>
import chroma from 'chroma-js';
defineProps<{ name?: string; color: string; opacity?: number }>();
</script>
<style lang="scss" scoped></style>
