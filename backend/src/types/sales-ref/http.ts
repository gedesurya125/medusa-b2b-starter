import { FindParams, PaginatedResponse } from "@medusajs/framework/types";
import { ModuleSalesRef } from "./module";

export interface SalesRefFilterParams extends FindParams {}

export type SalesRefsResponse = PaginatedResponse<{
  salesRefs: ModuleSalesRef[];
}>;

export type SalesRefResponse = {
  salesRef: ModuleSalesRef;
};
