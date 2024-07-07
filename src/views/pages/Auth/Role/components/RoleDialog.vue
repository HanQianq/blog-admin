<template>
  <MyDialog
    :visible="visible"
    width="450px"
    :title="optType === 'add' ? '创建角色' : '修改角色'"
    @close="closeHandler"
    @confirm="confirmHandler"
  >
    <el-form
      ref="formRef"
      :model="form"
      label-width="100px"
      :style="{ width: '100%' }"
    >
      <el-form-item
        field="roleName"
        label="角色名"
        validate-trigger="input"
        required
      >
        <el-input v-model="form.name" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item
        field="roleCode"
        label="角色码"
        validate-trigger="input"
        required
      >
        <el-input v-model="form.code" placeholder="请输入角色码" />
      </el-form-item>
      <el-form-item field="limit" label="角色数量限制">
        <el-input-number v-model="form.limit" :min="1" class="!w-full" />
      </el-form-item>
      <el-form-item field="sort" label="角色排序">
        <el-input-number v-model="form.sort" :min="0" class="!w-full" />
      </el-form-item>
    </el-form>
  </MyDialog>
</template>
<script setup lang="ts">
import type { RoleItemType } from '@/api/authority/role/type.ts';
import { addRoleApi, editRoleApi } from '@/api/authority/role';
import { ElMessage } from 'element-plus';
import { originalForm } from '@/views/pages/Auth/Role/service.ts';

type PropsType = {
  visible: boolean;
  optType: string;
  row: RoleItemType;
};
const props = defineProps<PropsType>();
const emits = defineEmits(['close', 'changeSuccess']);

const formRef = ref();
const form = ref({
  ...originalForm,
});

const closeHandler = () => {
  form.value = { ...originalForm };
  emits('close');
};

const confirmHandler = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const { data, msg } =
          props.optType === 'add'
            ? await addRoleApi(form.value)
            : await editRoleApi({ id: props.row.id, ...form.value });
        if (data) {
          ElMessage.success(msg);
          emits('changeSuccess');
          closeHandler();
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
};

onMounted(() => {
  if (props.optType === 'edit') {
    form.value = { ...props.row };
    console.log(form.value);
  }
});
</script>

<style scoped lang="scss"></style>
