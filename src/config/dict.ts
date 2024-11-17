type DictCategoryItemType = {
  label: string;
  value: string;
  children?: DictCategoryItemType[];
};

export const dictCategoryList: DictCategoryItemType[] = [
  {
    label: '文章',
    value: 'article',
    children: [
      {
        label: '标签颜色',
        value: 'article_tag_color',
      },
    ],
  },
];
