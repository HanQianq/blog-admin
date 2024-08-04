<template>
  <div class="w-full h-full">
    <div v-if="!editable" class="img-wrapper w-full h-full">
      <img v-if="imgUrl" :src="imgUrl" alt="" />
      <div v-else class="w-full h-full">未上传图片</div>
    </div>
    <div
      v-else
      class="w-full h-full hover-text hover-border"
      border="1px dashed #d9d9d9"
    >
      <el-upload
        class="pic-uploader w-full h-full"
        ref="uploadRef"
        accept=".jpg,.jpeg,.png,.webp,.svg,.gif"
        :before-upload="beforeUploadHandler"
        :show-file-list="false"
        :http-request="uploadFileHandler"
      >
        <img v-if="imgUrl" :src="imgUrl" alt="" />
        <my-icon v-else name="plus" size="32"></my-icon>
      </el-upload>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage, UploadProps } from 'element-plus';
import { uploadFileApi } from '@/api';
import { nanoid } from 'nanoid';
import { MAX_IMAGE_SIZE } from '@/config';

type PropsType = {
  editable: boolean;
  type: string;
};
const props = defineProps<PropsType>();
const emits = defineEmits(['uploadSuccess']);
const imgUrl = ref<string | null>(null);

const uploadRef = ref();

const beforeUploadHandler: UploadProps['beforeUpload'] = (rawFile: any) => {
  const fileLimit = rawFile.size / 1024 / 1024 < MAX_IMAGE_SIZE;
  if (!fileLimit) {
    ElMessage.error(`上传文件大小不超过${MAX_IMAGE_SIZE}M！`);
  }
  return fileLimit;
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

<style scoped lang="scss">
:deep(.el-upload) {
  width: 100%;
  height: 100%;
}
</style>
