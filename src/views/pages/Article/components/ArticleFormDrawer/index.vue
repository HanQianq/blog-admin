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
        <el-tree-select
          v-model="articleForm.category"
          :data="categoryList"
          node-key="id"
          :props="{ label: 'name' }"
          class="!w-full"
        />
      </el-form-item>
      <el-form-item prop="tags" label="文章标签">
        <el-select v-model="articleForm.tags" multiple :multiple-limit="4">
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
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
            :default-url="articleForm.cover"
            @upload-success="uploadSuccessHandler"
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
      <el-button type="primary" @click="confirmHandler">确定</el-button>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { useDict } from '@/hooks/useDict';
import { useArticleCategory, useArticleTag } from '../../hooks/useArticle';
import { OriginArticleFormTpe } from '../../types';

const props = defineProps<{
  defaultData: OriginArticleFormTpe | null;
}>();
const emits = defineEmits(['sendData']);

const { dictDataList: statusList, getDictDataList: getArticleStatusList } =
  useDict('ARTICLE_STATUS');
const { dictDataList: propertiesList, getDictDataList: getPropertiesList } =
  useDict('ARTICLE_PROPERTY');

const { categoryList, getCategoryTree } = useArticleCategory();
const { tagList, getTagList } = useArticleTag();

const visible = ref(false);
const openDrawer = () => {
  visible.value = true;
};

const closeDrawer = () => {
  visible.value = false;
};

const formRef = ref();

const originalForm: OriginArticleFormTpe = {
  category: '',
  cover: '',
  tags: [],
  abstract: '',
  visible: '',
  properties: '',
};

const articleForm = ref<OriginArticleFormTpe>({
  ...originalForm,
});

const articleFormRules = {
  category: [{ required: true, message: '文章分类不能为空', trigger: 'blur' }],
  tags: [{ required: true, message: '文章标签不能为空', trigger: 'blur' }],
  abstract: [{ required: true, message: '文章摘要不能为空', trigger: 'blur' }],
};

const uploadSuccessHandler = (url: string) => {
  articleForm.value.cover = url;
};

const initDrawer = async () => {
  await getArticleStatusList();
  await getPropertiesList();
  await getCategoryTree();
  await getTagList();
  if (propertiesList.value.length > 0) {
    articleForm.value.properties = propertiesList.value[0].key;
  }
  if (statusList.value.length > 0) {
    articleForm.value.visible = statusList.value[0].key;
  }
  if (props.defaultData) {
    console.log('🚀 ~ initDrawer ~ props.defaultData:', props.defaultData);
    articleForm.value = { ...props.defaultData };
  }
};

const confirmHandler = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    console.log('🚀 ~ initDrawer ~ props.defaultData:', props.defaultData);
    console.log('🚀 ~ initDrawer ~ props.defaultData:', props.defaultData);
    closeDrawer();
    emits('sendData', articleForm.value);
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
