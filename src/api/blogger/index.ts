import type { BloggerProfileType, BloggerProfileFormType } from './type';
import request from '@/utils/request';

export const getBloggerProfileApi = (data = {}) =>
  request.post<BloggerProfileType>('/blogger/profile/get', data);

export const updateBloggerProfileApi = (data: BloggerProfileFormType) =>
  request.post<boolean>('/blogger/profile/update', data);

export const uploadResumeApi = (data: FormData) =>
  request.post<string>('/blogger/resume/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
