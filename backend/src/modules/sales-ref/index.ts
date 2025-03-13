import { Module } from "@medusajs/framework/utils";
import SalesRefService from "./service";

export const SALES_REF_MODULE = "sales_ref";

export default Module(SALES_REF_MODULE, {
  service: SalesRefService,
});
