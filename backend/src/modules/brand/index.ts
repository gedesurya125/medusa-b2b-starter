//? Add Custom Field: Step3: Create custom field
//? This file tell medusa the name of the module and its main service
import { Module } from "@medusajs/framework/utils";
import BrandModuleService from "./service";

export const BRAND_MODULE = "brand";

export default Module(
  BRAND_MODULE, //? Module's Name
  {
    service: BrandModuleService, //? Main service
  }
);
