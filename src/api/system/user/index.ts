import { UserFormType, UserItemType, UserListQueryType } from './type';
import request from '@/utils/request';
export const addUserApi = (data: UserFormType) =>
  request.post<boolean>('/user/add', data);

export const getUserListApi = (data: UserListQueryType) =>
  request.post<ResPageType<UserItemType>>('/user/list', data);
