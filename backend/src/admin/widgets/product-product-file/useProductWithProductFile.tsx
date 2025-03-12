import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { sdk } from "../../lib/sdk";
import {
  AdminProductWithProductFiles,
  UploadFilesSuccessResponseDataType,
} from "./types";
import { queryKeysFactory } from "../../../../src/admin/lib/query-key-factory";
import { AdminProduct } from "@medusajs/framework/types";
import { MedusaError } from "@medusajs/framework/utils";

interface UseProductWithProductFileParamsType {
  productId: string;
}

// TODO: use this productQueryKey in another widget related to the product
const productsQueryKey = queryKeysFactory("products");

export const useProductWithProductFile = ({
  productId,
}: UseProductWithProductFileParamsType) => {
  const { data: queryResult } = useQuery({
    queryFn: () =>
      sdk.admin.product.retrieve(productId, {
        fields: "+product_files.*",
      }),
    queryKey: productsQueryKey.detail(productId),
  });
  const extendedResponse = queryResult?.product as AdminProductWithProductFiles;
  return extendedResponse;
};

export const updateProductWithProductFile = () => {
  const mutation = useMutation({
    mutationFn: async ({
      product,
      fileWithAlts,
    }: {
      product: AdminProduct;
      fileWithAlts: { file: File; alt: string }[];
    }) => {
      const formData = new FormData();

      // ? Uploading multiple files in single form data key https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
      fileWithAlts.forEach((fileWithAltItem) => {
        formData.append("files", fileWithAltItem.file);
        formData.append("alts", fileWithAltItem.alt);
      });

      //? the sdk.client.fetch automatically parsed to a javascript object : https://docs.medusajs.com/resources/js-sdk#send-requests-to-custom-routes

      const uploadedFiles = await sdk.client.fetch<
        UploadFilesSuccessResponseDataType | undefined
      >("/admin/product-file", {
        method: "POST",
        body: formData,
      });

      console.log("this is the uploaded files", uploadedFiles);

      if (!uploadedFiles)
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "No files were uploaded"
        );

      const updatedProduct = await sdk.client.fetch(
        `/admin/products/${product.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            additional_data: {
              product_file_id: "",
            },
          },
        }
      );
      // 1. upload the product file
      // ? Sending the request to the custom route need to use sdk.client.fetch https://docs.medusajs.com/resources/js-sdk#send-requests-to-custom-routes

      // 2. update the product by assign the product file id to the product
    },
  });
};

//? js-sdk admin product : https://docs.medusajs.com/resources/references/js-sdk/admin/product
