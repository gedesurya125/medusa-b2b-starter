import { FindParams, PaginatedResponse } from "@medusajs/framework/types";
import { ModuleSalesRef } from "./module";

export interface SalesRefFilterParams extends FindParams {}

export type SalesRefResponse = PaginatedResponse<{
  salesRefs: ModuleSalesRef[];
}>;
