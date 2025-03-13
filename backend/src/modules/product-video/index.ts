import { Module } from "@medusajs/framework/utils";
import ProductVideoService from "./service";

export const PRODUCT_VIDEO_MODULE = "product_video";

export default Module(PRODUCT_VIDEO_MODULE, {
  service: ProductVideoService,
});
