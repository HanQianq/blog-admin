<template>
  <div class="">
    <div class="flex items-center justify-between p-4">
      <el-button @click="openDialog('add')" type="primary">创建角色</el-button>
    </div>
    <div class="px-4">
      <el-table :data="roleList" size="large">
        <el-table-column
          v-for="item in columnList"
          :key="item.prop"
          :prop="item.prop"
          :label="item.title"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template #default="{ row }">
            <div flex w-full class="justify-center">
              <el-button link type="primary" @click="openDialog('edit', row)">
                修改
              </el-button>
              <el-button link type="danger" @click="deleteRoleHandler(row)">
                删除
              </el-button>
              <el-button link type="info" plain @click="deleteRoleHandler(row)">
                权限分配
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="formDialogProps.visible">
      <RoleDialog
        :visible="formDialogProps.visible"
        :opt-type="formDialogProps.optType"
        :row="formDialogProps.row"
        @close="closeDialog"
        @change-success="getRoleList"
      ></RoleDialog>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { deleteRoleApi, getRoleListApi } from '@/api/authority/role';
import type { RoleItemType } from '@/api/authority/role/type.ts';
import RoleDialog from '@/views/pages/Auth/Role/components/RoleDialog.vue';
import {
  originalForm,
  columnList,
  FormDialogPropsType,
} from '@/views/pages/Auth/Role/service.ts';
import { ElMessage } from 'element-plus';

const roleList = ref<RoleItemType[]>([]);

const formDialogProps = reactive<FormDialogPropsType>({
  visible: false,
  optType: '',
  row: { id: '', ...originalForm },
});

const openDialog = (optType: string, row?: any) => {
  formDialogProps.visible = true;
  formDialogProps.optType = optType;
  row && (formDialogProps.row = row);
};
const closeDialog = () => {
  formDialogProps.visible = false;
};

const getRoleList = async () => {
  const { data } = await getRoleListApi();
  roleList.value = data;
};

const deleteRoleHandler = (row: RoleItemType) => {
  confirmHandler('您将删除这个角色', async () => {
    const { data, msg } = await deleteRoleApi({ ids: [row.id] });
    if (data) {
      ElMessage.success(msg);
      await getRoleList();
    }
  });
};

onBeforeMount(() => {
  getRoleList();
});
</script>
<style lang="scss" scoped></style>
