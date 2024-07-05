<template>
  <div class="p-4">
    <div class="flex items-center justify-between">
      <a-button @click="openDialog">创建角色</a-button>
      <MyDialog
        :visible="visible"
        width="450px"
        title="创建角色"
        @close="closeDialog"
      >
        <a-form :model="form" auto-label-width :style="{ width: '100%' }">
          <a-form-item
            field="name"
            label="角色名"
            validate-trigger="input"
            required
          >
            <a-input v-model="form.name" placeholder="请输入角色名" />
          </a-form-item>
          <a-form-item
            field="code"
            label="角色码"
            validate-trigger="input"
            required
          >
            <a-input v-model="form.code" placeholder="请输入角色码" />
          </a-form-item>
          <a-form-item field="limit" label="角色数量限制">
            <a-input-number v-model="form.limit" :min="1" />
          </a-form-item>
          <a-form-item field="sort" label="角色排序">
            <a-input-number v-model="form.sort" :min="1" />
          </a-form-item>
        </a-form>
      </MyDialog>
    </div>
  </div>
</template>
<script lang="ts" setup>
const visible = ref(false);

const openDialog = () => {
  visible.value = true;
};
const closeDialog = () => {
  visible.value = false;
};

const form = reactive({
  name: '',
  code: '',
  sort: '',
  limit: '',
});
</script>
<style lang="scss" scoped></style>
