import { MedusaService } from "@medusajs/framework/utils";
import { BcProductInfo } from "./models/bcProductInfo";

class BcProductInfoService extends MedusaService({
  BcProductInfo,
}) {}

export default BcProductInfoService;
