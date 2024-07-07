<template>
  <div class="my-dialog w-full h-full">
    <el-dialog
      :model-value="visible"
      draggable
      :title="title"
      :width="width"
      title-align="start"
      :before-close="handleCancel"
      @close="handleCancel"
    >
      <template #header>
        <slot name="header"></slot>
      </template>
      <div>
        <slot></slot>
      </div>
      <template v-if="!hideFooter" #footer>
        <div>
          <el-button size="small" type="info" @click="handleCancel"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="confirmHandler"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
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

const handleCancel = () => {
  emit('close');
};

const confirmHandler = () => {
  emit('confirm');
};
</script>
<style lang="scss" scoped>
:deep(.el-dialog__header) {
  border-bottom: solid 1px var(--sys-border-color);
  margin-bottom: 1rem;
  padding: 0 1rem;
  height: 3rem;
  display: flex;
  align-items: center;
}
:deep(.el-dialog__title) {
  font-size: 14px;
  font-weight: bold;
}
:deep(.el-dialog__body) {
  padding: 0 2rem;
}
:deep(.el-dialog__footer) {
  border-top: solid 1px var(--sys-border-color);
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-dialog) {
  padding: 0;
}
</style>
