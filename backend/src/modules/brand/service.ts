// ? Add Custom Field: Step 2:
//? This service provide methods to manage the  Brand data model

import { MedusaService } from "@medusajs/framework/utils";
import { Brand } from "./models/brand";

// ? This function generate method for the brand data model. So now BrandModuleService has methods like createBrands and retrieveBrands
class BrandModuleService extends MedusaService({
  Brand,
}) {}

export default BrandModuleService;
