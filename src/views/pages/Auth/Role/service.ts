import type { RoleFormType } from '@/api/authority/role/type.ts';

export const originalForm: RoleFormType = {
  name: '',
  code: '',
  sort: 0,
  limit: 1,
};

export const columnList = [
  { title: '名称', prop: 'name' },
  { title: '角色码', prop: 'code' },
  { title: '排序', prop: 'sort' },
  { title: '人数上限', prop: 'limit' },
];
