<template>
  <div class="my-dialog w-full h-full">
    <a-modal
      :visible="visible"
      draggable
      :title="title"
      :width="width"
      title-align="start"
      :footer="!hideFooter"
      @ok="handleOk"
      @cancel="handleCancel"
      @close="handleCancel"
    >
      <template #title>
        <slot name="title"></slot>
      </template>
      <div>
        <slot></slot>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
type PropsType = {
  title: string;
  visible: boolean;
  width?: string;
  hideFooter?: boolean;
};

withDefaults(defineProps<PropsType>(), {
  width: '40%',
  hideFooter: false,
});

const emit = defineEmits(['confirm', 'close']);

const handleOk = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('close');
};
</script>
<style lang="scss" scoped></style>
