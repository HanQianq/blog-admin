<template>
  <div class="">
    <div class="flex items-center justify-between p-4">
      <el-button @click="openDialog">创建角色</el-button>
    </div>
    <div class="px-4">
      <el-table :data="roleList"> </el-table>
    </div>

    <MyDialog
      :visible="visible"
      width="450px"
      title="创建角色"
      @close="closeDialog"
      @confirm="confirmHandler"
    >
      <el-form :model="form" auto-label-width :style="{ width: '100%' }">
        <el-form-item
          field="roleName"
          label="角色名"
          validate-trigger="input"
          required
        >
          <el-input v-model="form.roleName" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item
          field="roleCode"
          label="角色码"
          validate-trigger="input"
          required
        >
          <el-input v-model="form.roleCode" placeholder="请输入角色码" />
        </el-form-item>
        <el-form-item field="limit" label="角色数量限制">
          <el-input-number v-model="form.limit" :min="1" />
        </el-form-item>
        <el-form-item field="sort" label="角色排序">
          <el-input-number v-model="form.sort" :min="1" />
        </el-form-item>
      </el-form>
    </MyDialog>
  </div>
</template>
<script lang="ts" setup>
import { addRoleApi, getRoleListApi } from '@/api/authority/role';
import type { RoleFormType, RoleItemType } from '@/api/authority/role/type.ts';
import { ElMessage } from 'element-plus';

const columnList = [
  { title: '名称', dataIndex: 'name' },
  { title: '角色码', dataIndex: 'code' },
  { title: '排序', dataIndex: 'sort' },
  { title: '人数上限', dataIndex: 'limit' },
  { title: '操作', slotName: 'option' },
];

const originalForm: RoleFormType = {
  roleName: '',
  roleCode: '',
  sort: 0,
  limit: 1,
};

const form = ref({
  ...originalForm,
});
const roleList = ref<RoleItemType[]>([]);

const visible = ref(false);

const openDialog = () => {
  visible.value = true;
};
const closeDialog = () => {
  visible.value = false;
  form.value = { ...originalForm };
};

const getRoleList = async () => {
  const { data } = await getRoleListApi();
  roleList.value = data;
};

const confirmHandler = async () => {
  try {
    const { data, msg } = await addRoleApi(form.value);
    if (data) {
      ElMessage.success(msg);
      closeDialog();
    }
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(() => {
  getRoleList();
});
</script>
<style lang="scss" scoped></style>
