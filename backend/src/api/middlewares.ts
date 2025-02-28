import {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { defineMiddlewares } from "@medusajs/medusa";
import { adminMiddlewares } from "./admin/middlewares";
import { storeMiddlewares } from "./store/middlewares";

import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { PostAdminCreateBrand } from "./admin/brands/validators";
import { z } from "zod";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

export const GetBrandsSchema = createFindParams();

export default defineMiddlewares({
  routes: [
    ...adminMiddlewares,
    ...storeMiddlewares,
    {
      matcher: "/store/customers/me",
      middlewares: [
        (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          req.allowed = ["orders", "addresses", "employee", "employees"];

          next();
        },
      ],
    },
    // ? Add Custom Field: Step 9: Add middleware to validate the request body before hit the api of /admin/brand
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateBrand)],
    },

    // ? Add Custom Field: Step 12 : add data validation to the /admin/products route. source: https://docs.medusajs.com/learn/customization/extend-features/extend-create-product#2-configure-additional-data-validation
    {
      matcher: "/admin/products",
      method: "POST",
      additionalDataValidator: {
        brand_id: z.string().optional(),
        documentUrl: z.string().optional(),
      },
    },

    {
      matcher: "/admin/products/:id",
      method: "POST",
      additionalDataValidator: {
        brand_id: z.string().optional(),
        documentUrl: z.string().optional(),
      },
    },

    // ? Add Custom Field: Step 15: Add default query Configuration https://docs.medusajs.com/learn/customization/customize-admin/route#2-add-default-query-configurations
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetBrandsSchema, {
          defaults: ["id", "name", "products.*"],
          isList: true,
        }),
      ],
    },
  ],
});
