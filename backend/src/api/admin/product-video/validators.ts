import { z } from "zod";

export const PostAdminCreateProductFile = z.object({
  videos: z.any(), // ? This key should be the same which defined in the models
  alts: z.string().array().optional(),
  alt: z.string().optional(),
});
