<template>
  <el-drawer
    :model-value="visible"
    :size="500"
    :lock-scroll="false"
    :before-close="closeDrawer"
    title="发布文章设置"
  >
    <el-form
      label-width="100px"
      ref="formRef"
      :rules="articleFormRules"
      :model="articleForm"
    >
      <el-form-item prop="category" label="文章分类">
        <el-select v-model="articleForm.category"></el-select>
      </el-form-item>
      <el-form-item prop="tag" label="文章标签">
        <el-select v-model="articleForm.tag"></el-select>
      </el-form-item>
      <el-form-item prop="original" label="是否原创">
        <el-radio-group v-model="articleForm.properties">
          <el-radio
            v-for="item in propertiesList"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="visible" label="文章状态">
        <el-radio-group v-model="articleForm.visible">
          <el-radio
            v-for="item in statusList"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="cover" label="文章封面">
        <div class="w-full h-48">
          <MyImageAutoUpload
            type="article-cover"
            desc="上传文章封面"
            editable
          ></MyImageAutoUpload>
        </div>
      </el-form-item>
      <el-form-item prop="abstract" label="编辑摘要">
        <el-input
          v-model="articleForm.abstract"
          type="textarea"
          :rows="4"
          maxlength="100"
          show-word-limit
          resize="none"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-end mt-4">
      <el-button @click="closeDrawer">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { useDict } from '@/hooks/useDict';

const { dictDataList: statusList, getDictDataList: getArticleStatusList } =
  useDict('ARTICLE_STATUS');
const { dictDataList: propertiesList, getDictDataList: getPropertiesList } =
  useDict('ARTICLE_PROPERTY');

const visible = ref(false);
const openDrawer = () => {
  visible.value = true;
};

const closeDrawer = () => {
  visible.value = false;
};

const originalForm = {
  category: '',
  cover: '',
  tag: [],
  abstract: '',
  visible: '',
  properties: '',
};

const articleForm = ref({
  ...originalForm,
});

const emits = defineEmits(['addSuccess']);

const articleFormRules = {
  category: [{ required: true, message: '文章分类不能为空', trigger: 'blur' }],
  tag: [{ required: true, message: '文章标签不能为空', trigger: 'blur' }],
  abstract: [{ required: true, message: '文章摘要不能为空', trigger: 'blur' }],
};

const initDrawer = async () => {
  await getArticleStatusList();
  await getPropertiesList();
  if (propertiesList.value.length > 0) {
    articleForm.value.properties = propertiesList.value[0].key;
  }
  if (statusList.value.length > 0) {
    articleForm.value.visible = statusList.value[0].key;
  }
};

onMounted(() => {
  initDrawer();
});

defineExpose({
  openDrawer,
});
</script>
<style lang="scss" scoped></style>
