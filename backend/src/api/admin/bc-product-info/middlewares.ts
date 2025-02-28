import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { PostAdminCreateBcProductInfo } from "./validators";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

export const GetBcProductInfoSchema = createFindParams();

export const bcProductInfoMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/bc-product-info",
    method: "POST",
    middlewares: [validateAndTransformBody(PostAdminCreateBcProductInfo)],
  },
  {
    matcher: "/admin/bc-product-info",
    method: "GET",
    middlewares: [
      validateAndTransformQuery(GetBcProductInfoSchema, {
        defaults: ["id", "bc_product_id", "products.*"],
        isList: true,
      }),
    ],
  },
];
