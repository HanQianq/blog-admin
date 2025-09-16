<template>
  <div
    class="inline-block text-center text-xs rounded min-w-50px"
    :class="{
      'rounded-full': round,
      'h-32px leading-32px px-3': size === 'large',
      'h-24px leading-24px px-2': size === 'normal',
      'h-16px leading-16px px-1': size === 'small',
    }"
    :style="{
      'background-color': `${chroma(realColor)
        .alpha(opacity || 0.1)
        .css()}`,
      color: realColor,
    }"
  >
    <span v-if="name">{{ name }}</span>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/system';
import chroma from 'chroma-js';
import { storeToRefs } from 'pinia';
interface Props {
  name?: string;
  color?: string;
  opacity?: number;
  round?: boolean;
  size?: 'small' | 'normal' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'normal',
  round: false,
  color: '',
});

const { theme } = storeToRefs(useSystemStore());
const colorMap: any = {
  blue: '#1e88e5',
  purple: '#5e35b1',
  green: '#43a047',
  red: '#f0ad4e',
  pink: '#e53935',
};

const realColor = computed(() => props.color || colorMap[theme.value]);
</script>
<style lang="scss" scoped></style>
