import { MedusaService } from "@medusajs/framework/utils";
import { ProductVideo } from "./models/product-video";

class ProductVideoService extends MedusaService({
  ProductVideo,
}) {}

export default ProductVideoService;
