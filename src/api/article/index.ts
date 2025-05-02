import {
  ArticleFormType,
  ArticleItemType,
  ArticleIdType,
  ArticleQueryType,
} from './type';
import request from '@/utils/request';
export const addArticleApi = (data: ArticleFormType) =>
  request.post<boolean>('/article/add', data);

export const editArticleApi = (data: ArticleFormType & ArticleIdType) =>
  request.post<boolean>('/article/update', data);

export const deleteArticleApi = (id: string) =>
  request.post<boolean>('/article/delete', { id });

export const getArticleListApi = (data: ArticleQueryType & PageType) =>
  request.post<ResPageType<ArticleItemType>>('/article/list', data);

export const getArticleDetailApi = (data: { id: string }) =>
  request.post<any>('/article/detail', data);
