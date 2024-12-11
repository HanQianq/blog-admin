import { getAllArticleCategoryTreeApi } from '@/api/article/category';
import type { ArticleCategoryItemType } from '@/api/article/category/type';
import { getArticleTagListApi } from '@/api/article/tag';
import type { ArticleTagItemType } from '@/api/article/tag/type';
import dayjs from 'dayjs';

function fmtResData(arr: ArticleCategoryItemType[]) {
  return arr.map((item) => ({
    ...item,
    createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
    children: item.children?.map((el) => ({
      ...el,
      createTime: dayjs(el.createTime).format('YYYY-MM-DD HH:mm:ss'),
    })),
  }));
}

export const useArticleCategory = () => {
  const categoryList = ref<ArticleCategoryItemType[]>([]);
  const loading = ref(true);
  const getCategoryTree = async () => {
    try {
      loading.value = true;
      const res = await getAllArticleCategoryTreeApi();
      categoryList.value = fmtResData(res.data);
    } catch (error) {
      categoryList.value = [];
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
  return { categoryList, loading, getCategoryTree };
};

export const useArticleTag = () => {
  const tagList = ref<ArticleTagItemType[]>([]);
  const getTagList = async () => {
    try {
      const res = await getArticleTagListApi({
        pageNumber: 1,
        pageSize: 1000,
        name: '',
      });
      tagList.value = res.data.result;
    } catch (error) {
      tagList.value = [];
      console.log(error);
    }
  };
  return { tagList, getTagList };
};
