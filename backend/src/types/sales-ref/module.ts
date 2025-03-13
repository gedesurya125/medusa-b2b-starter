export type ModuleSalesRef = {
  id: string;
  name: string;
  username: string;
  password: string;
  bc_sales_code: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

export type ModuleCreateSalesRef = {
  name: string;
  username: string;
  password: string;
  bc_sales_code?: string;
};

export type ModuleDeleteSalesRef = {
  id: string;
};

export type ModuleUpdateSalesRef = {
  id: string;
};
