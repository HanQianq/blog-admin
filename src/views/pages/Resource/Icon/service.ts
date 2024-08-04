import type { IconFormType, IconItemType } from '@/api/resource/icon/type.ts';
import type { FormDialogProps } from '@/types/type';

export const originalForm: IconFormType = {
  name: '',
  url: '',
  sort: 0,
  desc: '',
  source: '',
  category: '',
};

export const formRules = {
  name: [{ required: true, trigger: 'change', message: '请输入图标名称' }],
  url: [{ required: true, trigger: 'change', message: '请上传图标文件' }],
  source: [{ required: true, trigger: 'change', message: '请输入图标来源' }],
  category: [{ required: true, trigger: 'change', message: '请选择图标类型' }],
};

export type FormDialogPropsType = FormDialogProps<IconItemType>;
