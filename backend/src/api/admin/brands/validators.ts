// ? Add Custom Field: Step8: Create the validation schema as the route accept the name parameter in the request body source: https://docs.medusajs.com/learn/customization/custom-features/api-route#2-create-validation-schema
import { z } from "zod";

export const PostAdminCreateBrand = z.object({
  name: z.string(),
});
