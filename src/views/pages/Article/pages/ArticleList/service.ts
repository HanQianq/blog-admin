import type { ArticleTagItemType } from '@/api/article/tag/type.ts';
import dayjs from 'dayjs';

export const columnList = [
  { title: '文章标题', prop: 'title' },
  { title: '创建时间', prop: 'createTime' },
];

export const fmtResData = (arr: ArticleTagItemType[]) => {
  return arr.map((item) => ({
    ...item,
    createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
  }));
};
