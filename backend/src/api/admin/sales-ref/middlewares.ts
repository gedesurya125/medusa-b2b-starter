import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
  defineMiddlewares,
} from "@medusajs/framework";
import {
  AdminAddCompanyToSalesRef,
  AdminCreateSalesRefParams,
} from "./validator";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const GetSalesRefSchema = createFindParams();

export const salesRefMiddlewares: (MiddlewareRoute & {
  additionalDataValidators?: z.ZodRawShape;
})[] = [
  {
    matcher: "/admin/sales-ref",
    method: ["POST"],
    middlewares: [validateAndTransformBody(AdminCreateSalesRefParams)],
    additionalDataValidators: {
      company_id: z.string().optional(),
    },
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
  {
    matcher: "/admin/sales-ref/:id",
    method: "GET",
    middlewares: [
      validateAndTransformQuery(GetSalesRefSchema, {
        defaults: ["id", "name", "password", "username", "bc_sales_code"],
      }),
    ],
  },
  {
    matcher: "/admin/sales-ref/:id/companies",
    method: ["POST"],
    middlewares: [validateAndTransformBody(AdminAddCompanyToSalesRef)],
  },
];
