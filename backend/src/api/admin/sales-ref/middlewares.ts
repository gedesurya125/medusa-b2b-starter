import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { AdminCreateSalesRefType } from "./validator";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

export const GetSalesRefSchema = createFindParams();

export const salesRefMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/sales-ref",
    method: ["POST"],
    middlewares: [validateAndTransformBody(AdminCreateSalesRefType)],
  },
  {
    matcher: "/admin/sales-ref",
    method: "GET",
    middlewares: [
      validateAndTransformQuery(GetSalesRefSchema, {
        // TODO: remove the password latter
        defaults: ["id", "name", "password", "username", "bc_sales_code"],
        isList: true,
      }),
    ],
  },
];
