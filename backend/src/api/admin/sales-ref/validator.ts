// ? Add Custom Field: Step 8: Create the validation schema as the route accept the name parameter in the request body source: https://docs.medusajs.com/learn/customization/custom-features/api-route#2-create-validation-schema
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import { optional, z } from "zod";

export const AdminCreateSalesRefType = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  bc_sales_code: z.string().optional(),
});

export type AdminGetSalesRefParamsType = z.infer<typeof AdminGetSalesRefParams>;
export const AdminGetSalesRefParams = createFindParams({
  limit: 15,
  offset: 0,
}).merge(
  z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    username: z.string().optional(),
    bc_sales_code: z.string().optional(),
  })
);
