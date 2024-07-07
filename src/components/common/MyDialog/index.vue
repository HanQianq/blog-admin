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
          <el-button type="info" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="confirmHandler">确定</el-button>
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
<style lang="scss" scoped></style>
