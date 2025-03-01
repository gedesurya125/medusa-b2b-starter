import { Module } from "@medusajs/framework/utils";
import ProductFileService from "./service";

export const PRODUCT_FILE_MODULE = "product_file";

export default Module(PRODUCT_FILE_MODULE, {
  service: ProductFileService,
});
