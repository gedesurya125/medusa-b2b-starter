import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import multer from "multer";
import { PostAdminCreateProductFile } from "./validators";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

const upload = multer({
  storage: multer.memoryStorage(),
});

export const GetProductFileSchema = createFindParams();

export const productFileMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/product-file",
    method: ["POST"],
    middlewares: [
      // @ts-ignore
      upload.array("files"), // multer should run first
      validateAndTransformBody(PostAdminCreateProductFile),
    ],
  },
  {
    matcher: "/admin/product-file",
    method: "GET",
    middlewares: [
      validateAndTransformQuery(GetProductFileSchema, {
        defaults: ["id", "file_url", "alt", "product"], //? singular product because a multiple product file can be assigned into single product
        isList: true,
      }),
    ],
  },
];
