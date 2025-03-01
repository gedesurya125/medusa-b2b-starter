import { MedusaService } from "@medusajs/framework/utils";
import { ProductFile } from "./models/product-file";

class ProductFileService extends MedusaService({
  ProductFile,
}) {}

export default ProductFileService;
