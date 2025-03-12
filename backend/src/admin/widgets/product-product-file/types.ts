import { AdminProduct } from "@medusajs/framework/types";

export type ProductFileType = {
  alt: string;
  created_at: string;
  deleted_at: null;
  file_url: string;
  id: string;
  updated_at: string;
};

export type AdminProductWithProductFiles = AdminProduct & {
  product_files: ProductFileType[];
};

export type UploadFilesSuccessResponseDataType = {
  files: {
    id: string;
    file_url: string | null;
    alt: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  }[];
};
