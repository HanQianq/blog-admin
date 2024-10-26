<template>
  <div class="my-md-editor w-full h-full">
    <v-md-editor
      v-model="text"
      height="100%"
      :disabled-menus="[]"
      :left-toolbar="toolbar"
    ></v-md-editor>
  </div>
</template>
<script lang="ts" setup>
const text = ref('');
const toolbar =
  'undo redo clear | h bold italic strikethrough quote | ul ol table hr  | link image code | emoji tip todo-list  | save ';

const getText = () => {
  return text.value;
};
defineExpose({ getText });
</script>
<style lang="scss" scoped></style>
