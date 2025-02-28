import { z } from "zod";

export const PostAdminCreateBcProductInfo = z.object({
  bc_product_id: z.string(), // ? This key should be the same which defined in the models
});
