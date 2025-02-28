import {
  MiddlewareRoute,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { PostAdminCreateBcProductInfo } from "./validators";

export const bcProductInfoMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/bc-product-info",
    method: "POST",
    middlewares: [validateAndTransformBody(PostAdminCreateBcProductInfo)],
  },
];
