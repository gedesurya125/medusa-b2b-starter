import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { sdk } from "../../lib/sdk";
import {
  AdminProductWithProductFiles,
  ProductFileType,
  UploadFilesSuccessResponseDataType,
} from "./types";
import { queryKeysFactory } from "../../lib/query-key-factory";
import { AdminProduct } from "@medusajs/framework/types";
import type { Product } from "../../../../.medusa/types/query-entry-points";

interface UseProductWithProductFileParamsType {
  productId: string;
}

const updateProductFiles = async ({
  productId,
  productFileIds,
}: {
  productId: string;
  productFileIds: string[];
}) => {
  const updatedProduct = await sdk.client.fetch<{
    product: AdminProductWithProductFiles;
  }>(`/admin/products/${productId}?fields=+product_files.*`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      additional_data: {
        product_file_ids: productFileIds,
      },
    },
  });
  return updatedProduct;
};

// TODO: use this productQueryKey in another widget related to the product
const productsQueryKey = queryKeysFactory("products");

export const useProductFiles = ({
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

export const useUpdateProductFiles = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      product,
      files,
      alts,
    }: {
      product: AdminProductWithProductFiles;
      files: FileList;
      alts: string[];
    }) => {
      const formData = new FormData();

      // ? Uploading multiple files in single form data key https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
      if (files.length === 1) {
        formData.append("files", files[0]);
        formData.append("alt", alts[0] || files[0].name);
      } else if (files.length > 1) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
          formData.append("alts", alts[i] || files[i].name);
        }
      }

      //? the sdk.client.fetch automatically parsed to a javascript object : https://docs.medusajs.com/resources/js-sdk#send-requests-to-custom-routes
      // ? Sending the request to the custom route need to use sdk.client.fetch https://docs.medusajs.com/resources/js-sdk#send-requests-to-custom-routes
      // ! The Sdk.client.fetch not support form-data
      const uploadedFiles = await fetch("/admin/product-file", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (uploadedFiles) {
        const oldLinkedProductsIds =
          product?.product_files?.map(
            (existingProduct) => existingProduct?.id
          ) || [];

        const updatedProduct = await updateProductFiles({
          productId: product.id,
          productFileIds: [
            ...uploadedFiles.files.map(
              (fileItem: ProductFileType) => fileItem.id
            ),
            ...oldLinkedProductsIds,
          ],
        });
        return { uploadedFiles, updatedProduct };
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productsQueryKey.detail(variables.product.id),
      });
    },
    onError: (error, variables, context) => {
      // TODO: handle error and handle roll back eg: undoing the file upload if the product update failed
    },
  });

  return mutation;
};

export const useDeleteProductFile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      product,
      deletedProductId,
    }: {
      product: AdminProductWithProductFiles;
      deletedProductId: string;
    }) => {
      const isFileToBeDeletedLinkedToProduct =
        product.product_files.findIndex(
          (productFileItem) => productFileItem.id === deletedProductId
        ) !== -1;

      if (!isFileToBeDeletedLinkedToProduct) return null;

      const remainingLinkedFileIds = product.product_files
        .filter((product) => product.id !== deletedProductId)
        .map((product) => product.id);

      const updatedProductFiles = await updateProductFiles({
        productId: product.id,
        productFileIds: remainingLinkedFileIds,
      });

      return { remainingLinkedFileIds, updatedProductFiles };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productsQueryKey.detail(variables.product.id),
      });
    },
    onError: (error, variables, context) => {
      // TODO: handle error
    },
  });

  return mutation;
};

//? js-sdk admin product : https://docs.medusajs.com/resources/references/js-sdk/admin/product
