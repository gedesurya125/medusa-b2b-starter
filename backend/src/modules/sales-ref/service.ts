import { MedusaService } from "@medusajs/framework/utils";
import { SalesRef } from "./models/salesref";

class SalesRefService extends MedusaService({
  SalesRef,
}) {}

export default SalesRefService;
