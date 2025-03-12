import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { Container } from "../../components/common/Container";

import { FileTable } from "./FileTable";
import { ProductFileUploadModal } from "./ProductFieldUploadModal";
import React from "react";
import { useProductFiles } from "./useProductFiles";

const ProductFileWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const [openFileUploadModal, setOpenFieldUploadModal] = React.useState(false);

  const productWithFiles = useProductFiles({ productId: product.id });

  return (
    <>
      <Container
        title="Product Documentation"
        onClickMenuAdd={() => {
          setOpenFieldUploadModal(true);
        }}
      >
        <FileTable product={productWithFiles} />
      </Container>
      <ProductFileUploadModal
        open={openFileUploadModal}
        onOpenChange={setOpenFieldUploadModal}
        product={productWithFiles}
        accept={".pdf"}
      />
    </>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.side.after",
});

export default ProductFileWidget;
