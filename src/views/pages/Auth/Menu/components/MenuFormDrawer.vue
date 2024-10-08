<template>
  <div class="">
    <el-drawer
      :model-value="visible"
      title="菜单管理"
      :size="500"
      :lock-scroll="false"
      :before-close="closeDrawerHandler"
    >
      <el-form
        label-width="100px"
        ref="formRef"
        :rules="menuFormRules"
        :model="menuForm"
      >
        <el-form-item prop="name" label="菜单名称">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="菜单码">
          <el-input v-model="menuForm.code"></el-input>
        </el-form-item>
        <el-form-item prop="route" label="菜单路由">
          <el-input v-model="menuForm.route"></el-input>
        </el-form-item>
        <el-form-item prop="father" label="父菜单">
          <el-input v-model="menuForm.father"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="菜单类型">
          <el-radio-group v-model="menuForm.type">
            <el-radio value="1" size="small" border>目录</el-radio>
            <el-radio value="2" size="small" border>菜单</el-radio>
            <el-radio value="3" size="small" border>TAB</el-radio>
            <el-radio value="4" size="small" border>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="level" label="菜单层级">
          <el-radio-group v-model="menuForm.level">
            <el-radio :value="1" size="small" border>一级</el-radio>
            <el-radio :value="2" size="small" border>二级</el-radio>
            <el-radio :value="3" size="small" border>三级</el-radio>
            <el-radio :value="4" size="small" border>四级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="color" label="菜单颜色">
          <el-input v-model="menuForm.color"></el-input>
        </el-form-item>
        <el-form-item prop="sort" label="菜单排序">
          <el-input-number
            v-model="menuForm.sort"
            class="!w-full"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="color" label="菜单图标">
          <SelectIcon></SelectIcon>
        </el-form-item>
      </el-form>
      <div class="flex justify-end mt-4">
        <el-button @click="closeDrawerHandler">取消</el-button>
        <el-button type="primary" @click="submitFormHandler">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { addMenuApi } from '@/api/authority/menu';
import { MenuFormType } from '@/api/authority/menu/type';
import { ElMessage } from 'element-plus';

const formRef = ref();
const visible = ref(false);
const originalForm: MenuFormType = {
  name: '',
  route: '',
  icon: '',
  color: '',
  code: '',
  type: '',
  sort: 0,
  level: 0,
  father: null,
};

const menuForm = ref<MenuFormType>({
  ...originalForm,
});

const emits = defineEmits(['addSuccess']);

const menuFormRules = {
  name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '菜单码不能为空', trigger: 'blur' }],
  route: [{ required: true, message: '菜单路由不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '菜单类型不能为空', trigger: 'change' }],
  level: [{ required: true, message: '菜单层级不能为空', trigger: 'blur' }],
};
const openDrawerHandler = () => {
  visible.value = true;
};
const closeDrawerHandler = () => {
  menuForm.value = { ...originalForm };
  visible.value = false;
};

const submitFormHandler = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return;
    const res = await addMenuApi(menuForm.value);
    if (res.code === 0) {
      closeDrawerHandler();
      ElMessage.success(res.msg);
      emits('addSuccess');
    }
  });
};

defineExpose({
  openDrawerHandler,
});
</script>
<style lang="scss" scoped></style>
