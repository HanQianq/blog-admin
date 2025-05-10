<template>
  <div class="w-full h-full flex flex-col">
    <div v-if="!editable" class="img-wrapper w-full flex-1 h-0">
      <img v-if="imgUrl" :src="imgUrl" alt="" class="wh-full" />
      <div v-else class="w-full h-full">未上传图片</div>
    </div>
    <div
      v-else
      class="w-full flex-1 h-0 hover-text hover-border border-wrapper border-dashed"
    >
      <el-upload
        class="pic-uploader deep-wrapper-item w-full h-full"
        ref="uploadRef"
        accept=".jpg,.jpeg,.png,.webp,.svg,.gif"
        :before-upload="beforeUploadHandler"
        :show-file-list="false"
        :http-request="uploadFileHandler"
      >
        <img v-if="imgUrl" :src="imgUrl" alt="" class="w-full h-full" />
        <div v-else class="xy-center flex-col">
          <my-icon name="upload" size="24" title="上传"></my-icon>
          <span v-if="desc">{{ desc }}</span>
        </div>
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
  desc?: string;
  defaultUrl?: string | null;
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
    ElMessage.success('上传成功');
  } catch {
    ElMessage.error('上传文件失败');
  }
};

onMounted(() => {
  if (props.defaultUrl) {
    imgUrl.value = props.defaultUrl;
  }
});
</script>

<style scoped lang="scss">
:deep(.el-upload) {
  width: 100%;
  height: 100%;
}
</style>
