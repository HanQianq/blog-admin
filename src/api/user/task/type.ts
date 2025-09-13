export type UserTaskFormType = {
  title: string;
  tags: string[];
  description: string;
  priority: string;
  status: string;
  deadline: string;
  importance: number;
  urgency: number;
  growth: number;
  happiness: number;
  negative: number;
};

export type UserTaskSearchType = {
  title: string;
};

export type UserTaskItemType = {
  createTime: string;
  updateTime: string;
} & UserTaskFormType &
  IdType;
