<template>
  <div class="icon-manage border-bottom">
    <div class="header-wrapper p-4 flex justify-between items-center">
      <div class="flex items-center">
        <el-input placeholder="输入名称搜索" class="mr-4 !w-280px"></el-input>
        <el-button type="primary" @click="openDialog('add')"
          >新建图标</el-button
        >
      </div>

      <el-segmented v-model="currentLayout" :options="options" />
    </div>
    <div v-if="formDialogProps.visible">
      <IconFormDialog
        :visible="formDialogProps.visible"
        :opt-type="formDialogProps.optType"
        :row="formDialogProps.row"
        @close="closeDialog"
      ></IconFormDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconFormDialog from './components/IconFormDialog.vue';
import { type FormDialogPropsType, originalForm } from './service.ts';
const currentLayout = ref('card');
const options = [
  {
    label: '卡片',
    value: 'card',
  },
  {
    label: '简洁',
    value: 'simple',
  },
];

const formDialogProps = reactive<FormDialogPropsType>({
  visible: false,
  optType: '',
  row: { id: '', createTime: '', ...originalForm },
});

const openDialog = (optType: string, row?: any) => {
  formDialogProps.visible = true;
  formDialogProps.optType = optType;
  row && (formDialogProps.row = row);
};
const closeDialog = () => {
  formDialogProps.visible = false;
};
</script>
<style scoped lang="scss"></style>
