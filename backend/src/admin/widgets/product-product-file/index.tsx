import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { Container } from "../../components/common/Container";

import { FileTable } from "./FileTable";
import { ProductFileUploadModal } from "./ProductFieldUploadModal";
import React from "react";
import { useProductWithProductFile } from "./useProductWithProductFile";

const ProductFileWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const [openFileUploadModal, setOpenFieldUploadModal] = React.useState(false);

  const productWithFiles = useProductWithProductFile({ productId: product.id });

  return (
    <>
      <Container
        title="Product Files"
        onClickMenuAdd={() => {
          setOpenFieldUploadModal(true);
        }}
      >
        <FileTable productFiles={productWithFiles?.product_files} />
      </Container>
      <ProductFileUploadModal
        open={openFileUploadModal}
        onOpenChange={setOpenFieldUploadModal}
        product={productWithFiles}
      />
    </>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductFileWidget;
