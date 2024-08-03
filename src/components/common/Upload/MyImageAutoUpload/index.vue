<template>
  <div class="w-full h-full">
    <div v-if="!editable" class="img-wrapper w-full h-full">
      <img v-if="imgUrl" :src="imgUrl" alt="" />
      <div v-else class="w-full h-full">未上传图片</div>
    </div>
    <div v-else>
      <el-upload
        ref="uploadRef"
        auto-upload
        accept=".jpg,.jpeg,.png,.webp,.svg,.gif"
        :before-upload="beforeUploadHandler"
        :show-file-list="false"
        :http-request="uploadFileHandler"
      ></el-upload>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage, UploadProps } from 'element-plus';
import { uploadFileApi } from '@/api';
import { nanoid } from 'nanoid';

type PropsType = {
  editable: boolean;
  type: string;
};
const props = defineProps<PropsType>();
const emits = defineEmits(['uploadSuccess']);
const imgUrl = ref<string | null>(null);

const uploadRef = ref();

const beforeUploadHandler: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > MAX_IMAGE_SIZE) {
    ElMessage.error(`上传图片大小不能超过${MAX_IMAGE_SIZE}M`);
    return false;
  }
  return true;
};

const uploadFileHandler = async (raw: any) => {
  const formData = new FormData();
  formData.append('file', raw.file);
  formData.append('name', nanoid() + raw.file.name);
  formData.append('type', props.type);
  try {
    const { data } = await uploadFileApi(formData);
    imgUrl.value = data;
    emits('uploadSuccess', data);
  } catch {
    ElMessage.error('上传文件失败');
  }
};
</script>

<style scoped lang="scss"></style>
