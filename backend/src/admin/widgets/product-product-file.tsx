import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { Heading } from "@medusajs/ui";
import { Container } from "../components/common/Container";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { Thumbnail } from "../components";

type AdminProductWithProductFiles = AdminProduct & {
  product_files: {
    alt: string;
    created_at: string;
    deleted_at: null;
    file_url: string;
    id: string;
    updated_at: string;
  }[];
};

const ProductFileWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const queryClient = useQueryClient();

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
    <Container
      title="Product Files"
      onClickMenuAdd={() => {}}
      onClickMenuEdit={() => {}}
    >
      {extendedResponse?.product_files?.map((file) => (
        <Thumbnail src={file.file_url} alt={file.alt} />
      ))}
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductFileWidget;
