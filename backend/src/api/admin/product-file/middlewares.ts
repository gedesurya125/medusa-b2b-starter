import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework";
import multer from "multer";
import { PostAdminCreateProductFile } from "./validators";

const upload = multer({
  storage: multer.memoryStorage(),
});

export const productFileUploadMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/product-file",
    method: ["POST"],
    middlewares: [
      // @ts-ignore
      upload.array("files"), // multer should run first
      validateAndTransformBody(PostAdminCreateProductFile),
    ],
  },
];
