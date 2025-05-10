import {
  ArticleFormType,
  ArticleItemType,
  ArticleIdType,
  ArticleQueryType,
  type ArticleListItemType,
} from './type';
import request from '@/utils/request';
export const addArticleApi = (data: ArticleFormType) =>
  request.post<string>('/article/add', data);

export const editArticleApi = (data: ArticleFormType & ArticleIdType) =>
  request.post<boolean>('/article/update', data);

export const deleteArticleApi = (id: string) =>
  request.post<boolean>('/article/delete', { id });

export const getArticleListApi = (data: ArticleQueryType & PageType) =>
  request.post<ResPageType<ArticleListItemType>>('/article/list', data);

export const getArticleDetailApi = (data: { id: string }) =>
  request.post<any>('/article/detail', data);
