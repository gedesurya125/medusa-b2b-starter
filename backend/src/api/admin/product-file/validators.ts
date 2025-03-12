import { z } from "zod";

export const PostAdminCreateProductFile = z.object({
  files: z.any(), // ? This key should be the same which defined in the models
  alts: z.string().array().optional(),
});
