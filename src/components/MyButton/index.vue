<template>
  <div
    class="my-button xy-center"
    :class="`my-button-${type} my-button-${size}`"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
type PropsType = {
  type?: 'default' | 'plain' | 'text';
  size?: 'small' | 'large' | 'middle';
  round?: boolean;
};

withDefaults(defineProps<PropsType>(), {
  type: 'default',
  size: 'middle',
  round: false,
});
</script>
<style lang="scss" scoped>
.my-button {
  cursor: pointer;
  transition: all 0.3s ease;
  &-default {
    border-radius: 0.25rem;
    background-color: var(--sys-main-color);
    color: #fff;
    &.my-button-middle {
      padding: 0.5rem 0.75rem;
    }
    &.my-button-large {
      padding: 0.75rem 1rem;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  &-plain {
    &.my-button-middle {
      padding: 0.5rem 0.75rem;
    }
    &.my-button-large {
      padding: 0.75rem 1rem;
    }
    border-radius: 0.25rem;
    background-color: var(--sys-box-bg-color);
    border: solid 1px var(--sys-main-color);
    color: var(--sys-main-color);
    &:hover {
      background-color: var(--sys-main-color);
      color: #fff;
    }
  }
  &-text {
    color: var(--sys-main-color);
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
