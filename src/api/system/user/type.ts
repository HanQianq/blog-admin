export type UserFormType = {
  username: string;
  nickName: string;
  email: string;
  roleIds: string[];
};

export type UserItemType = IdType &
  UserFormType & {
    createTime: string | Date;
    profile: any;
  };

export type UserListQueryType = {
  keyword: string;
  roleId: string;
};
