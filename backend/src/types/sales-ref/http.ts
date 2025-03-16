import { FindParams, PaginatedResponse } from "@medusajs/framework/types";
import { ModuleSalesRef } from "./module";
import { CompanyDTO } from "src/modules/company/types/common";

export interface SalesRefFilterParams extends FindParams {}

export type SalesRefsResponse = PaginatedResponse<{
  salesRefs: ModuleSalesRef[];
}>;

export type SalesRefResponse = {
  salesRef: ModuleSalesRef;
};

export type SalesRefResponseWithLinkedCompanies = {
  salesRef: ModuleSalesRef & {
    companies: CompanyDTO[];
  };
};

export type AdminCreateSalesRef = {
  name: string;
  username: string;
  password: string;
  bc_sales_code: string | null;
};
