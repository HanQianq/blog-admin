export type DictCategoryItemType = {
  label: string;
  value: string;
  code: string;
  children?: DictCategoryItemType[];
};

export const dictCategoryList: DictCategoryItemType[] = [
  {
    label: '文章',
    value: 'article',
    code: 'ARTICLE',
    children: [
      {
        label: '文章状态',
        value: 'article_status',
        code: 'ARTICLE_STATUS',
      },
      {
        label: '文章属性',
        value: 'article_property',
        code: 'ARTICLE_PROPERTY',
      },
      {
        label: '标签颜色',
        value: 'article_tag_color',
        code: 'ARTICLE_TAG_COLOR',
      },
    ],
  },
  {
    label: '权限',
    value: 'authority',
    code: 'AUTHORITY',
    children: [
      {
        label: '菜单类型',
        value: 'menu_type',
        code: 'MENU_TYPE',
      },
      {
        label: '菜单颜色',
        value: 'menu_color',
        code: 'MENU_COLOR',
      },
    ],
  },
  { label: '系统', value: 'system', code: 'SYSTEM' },
  { label: '其他', value: 'other', code: 'OTHER' },
];
