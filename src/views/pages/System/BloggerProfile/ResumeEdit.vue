<template>
  <div class="resume-edit p-4">
    <div v-if="resumeFileUrl" class="mb-4">
      <div class="text-gray-600 mb-2">
        当前简历:
        <span class="text-blue-500">{{ resumeFileName }}</span>
      </div>
      <div class="flex gap-2">
        <el-button type="primary" @click="previewResume"> 预览 </el-button>
        <el-button type="danger" @click="deleteResume"> 删除 </el-button>
      </div>
    </div>

    <div class="mt-4">
      <el-upload
        :show-file-list="false"
        :before-upload="beforeUpload"
        :http-request="uploadHandler"
        accept=".pdf"
      >
        <el-button type="primary">
          <my-icon name="upload" size="14" class="mr-1" />
          上传新简历
        </el-button>
      </el-upload>
      <div class="text-gray-400 text-sm mt-2">
        仅支持 PDF 格式，文件大小不超过 5MB
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { uploadResumeApi } from '@/api/blogger';
import type { UploadRequestOptions } from 'element-plus';

const props = defineProps<{
  resumeFileUrl: string;
  resumeFileName: string;
}>();

const emit = defineEmits<{
  'update:resumeFileUrl': [value: string];
  'update:resumeFileName': [value: string];
  save: [];
}>();

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const beforeUpload = (file: File) => {
  if (file.type !== 'application/pdf') {
    ElMessage.error('仅支持 PDF 格式文件');
    return false;
  }
  if (file.size > MAX_SIZE) {
    ElMessage.error('文件大小不能超过 5MB');
    return false;
  }
  return true;
};

const uploadHandler = async ({ file }: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append('file', file as File);

  try {
    const { data } = await uploadResumeApi(formData);
    emit('update:resumeFileUrl', data);
    emit('update:resumeFileName', (file as File).name);
    emit('save');
    ElMessage.success('上传成功');
  } catch {
    ElMessage.error('上传失败');
  }
};

const previewResume = () => {
  if (props.resumeFileUrl) {
    window.open(props.resumeFileUrl, '_blank');
  }
};

const deleteResume = () => {
  emit('update:resumeFileUrl', '');
  emit('update:resumeFileName', '');
  emit('save');
  ElMessage.success('已删除');
};
</script>
