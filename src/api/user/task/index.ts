import { UserTaskFormType, UserTaskItemType, UserTaskSearchType } from './type';
import request from '@/utils/request';
export const addUserTaskApi = (data: UserTaskFormType) =>
  request.post<boolean>('/user/task/add', data);

export const editUserTaskApi = (data: UserTaskItemType) =>
  request.post<boolean>('/user/task/edit', data);

export const deleteUserTaskApi = (data: IdsType) =>
  request.post<boolean>('/user/task/delete', data);

export const getUserTaskListApi = (data: PageType & UserTaskSearchType) =>
  request.post<ResPageType<UserTaskItemType>>('/user/task/list', data);
