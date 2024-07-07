import { RoleFormType, RoleItemType } from './type';
import request from '@/utils/request';
export const addRoleApi = (data: RoleFormType) =>
  request.post<boolean>('/authority/role/add', data);

export const getRoleListApi = () =>
  request.get<RoleItemType[]>('/authority/role/list');
