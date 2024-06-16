<template>
  <component
    :is="'icon-' + name"
    :theme="theme"
    :size="size"
    class="flex items-center"
  />
</template>
<script lang="ts" setup>
type PropsType = {
  name: string;
  theme?: string;
  size?: number;
};

withDefaults(defineProps<PropsType>(), {
  theme: 'outline',
  size: 14,
});
</script>
<style lang="scss" scoped></style>
