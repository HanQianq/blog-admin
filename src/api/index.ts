import { ResLoginType } from './type';
import request from '@/utils/request';
export const loginApi = (data: {
  username: string;
  password: string;
  key: string;
  code: string;
}) => request.post<ResLoginType>('/user/login/admin', data);

export const getValidCodeApi = (data: { key: string }) =>
  request.post<string>('/user/valid/code', data);
