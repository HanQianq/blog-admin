<template>
  <div class="my-md-editor w-full h-full">
    <v-md-editor
      v-model="text"
      height="100%"
      placeholder="请输入内容……"
      :disabled-menus="[]"
      :left-toolbar="toolbar"
      @save="saveHandler"
    ></v-md-editor>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['save']);
const text = ref('');
const toolbar =
  'undo redo clear | h bold italic strikethrough quote | ul ol table hr  | link image code | emoji tip todo-list  | save ';

const saveHandler = () => {
  emit('save');
};

const getText = () => {
  return text.value;
};

const setText = (content: string) => {
  text.value = content;
};

defineExpose({ getText, setText });
</script>
<style lang="scss" scoped>
:deep(.v-md-textarea-editor textarea) {
  background-color: var(--sys-deep-wrapper-bg-color);
}
</style>
