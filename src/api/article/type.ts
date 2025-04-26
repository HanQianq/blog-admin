export type ArticleFormType = {
  title: string;
  pinyin: string;
  category: string;
  content: string;
  properties: string;
  visible: string;
  column?: string;
  cover?: string;
  // isTop = models.BooleanField(default=False, db_column='is_top')
  abstract: string;
};

export type ArticleIdType = {
  id: string;
};

export type ArticleItemType = ArticleFormType & {
  id: string;
  createTime: string;
  updateTime: string;
};

export type ArticleQueryType = {
  title: string;
  category?: string;
  tags?: string[];
  visible?: string;
  column?: string;
  isTop?: boolean;
};
