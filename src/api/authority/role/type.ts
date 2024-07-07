export type RoleFormType = {
  roleName: string;
  roleCode: string;
  sort: number;
  limit: number;
};

export type RoleItemType = IdType & RoleFormType;
