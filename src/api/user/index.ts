import { UserFormType, type UserInfoType } from './type';
import request from '@/utils/request';
export const getUserProfileApi = (data = {}) =>
  request.post<UserInfoType>('/user/get/self', data);

export const updateUserProfileApi = (data: UserFormType) =>
  request.post<boolean>('/user/valid/code', data);
