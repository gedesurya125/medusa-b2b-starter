import { Module } from "@medusajs/framework/utils";
import BcProductInfoService from "./service";

export const BC_PRODUCT_INFO_MODULE = "bc_product_info";

export default Module(BC_PRODUCT_INFO_MODULE, {
  service: BcProductInfoService,
});
