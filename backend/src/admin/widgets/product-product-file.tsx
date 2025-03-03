import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { Heading, Table } from "@medusajs/ui";
import { Container } from "../components/common/Container";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { Thumbnail } from "../components";

type ProductFileType = {
  alt: string;
  created_at: string;
  deleted_at: null;
  file_url: string;
  id: string;
  updated_at: string;
};

type AdminProductWithProductFiles = AdminProduct & {
  product_files: ProductFileType[];
};

const ProductFileWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
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
      <FileTable productFiles={extendedResponse?.product_files} />
      {/* {extendedResponse?.product_files?.map((file) => (
        <Thumbnail src={file.file_url} alt={file.alt} />
      ))} */}
    </Container>
  );
};

// TODO: display the file list as a table

const FileTable = ({ productFiles }: { productFiles: ProductFileType[] }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No.</Table.HeaderCell>
          <Table.HeaderCell>File</Table.HeaderCell>
          <Table.HeaderCell>Alt</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {productFiles?.map((productFileItem, index) => {
          return (
            <FileTableRow
              key={index}
              index={index}
              productFile={productFileItem}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};

const FileTableRow = ({
  productFile,
  index,
}: {
  productFile: ProductFileType;
  index: number;
}) => {
  return (
    <Table.Row>
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell>
        <Thumbnail src={productFile.file_url} alt={productFile.alt} />
      </Table.Cell>
      <Table.Cell>{productFile.alt}</Table.Cell>
    </Table.Row>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductFileWidget;
