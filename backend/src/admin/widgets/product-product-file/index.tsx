import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { Container } from "../../components/common/Container";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../lib/sdk";
import { AdminProductWithProductFiles } from "./types";
import { FileTable } from "./FileTable";
import { ProductFileUploadModal } from "./ProductFieldUploadModal";
import React from "react";

const ProductFileWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const [openFileUploadModal, setOpenFieldUploadModal] = React.useState(false);

  const { data: queryResult } = useQuery({
    queryFn: () =>
      sdk.admin.product.retrieve(product.id, {
        fields: "+product_files.*",
      }),
    queryKey: ["product", product.id],
  });
  const extendedResponse = queryResult?.product as AdminProductWithProductFiles;

  console.log("this is the query result", extendedResponse?.product_files);

  return (
    <>
      <Container
        title="Product Files"
        onClickMenuAdd={() => {
          setOpenFieldUploadModal(true);
        }}
        onClickMenuEdit={() => {}}
      >
        <FileTable productFiles={extendedResponse?.product_files} />
      </Container>
      <ProductFileUploadModal
        open={openFileUploadModal}
        onOpenChange={setOpenFieldUploadModal}
        handleSave={() => {}}
      />
    </>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductFileWidget;
