import { Table } from "@medusajs/ui";

import { Thumbnail } from "../../components";
import { AdminProductWithProductFiles, ProductFileType } from "./types";
import { Menu } from "../../components/common/Container";
import { useDeleteProductFile } from "./useProductFiles";

export const FileTable = ({
  product,
}: {
  product: AdminProductWithProductFiles;
}) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No.</Table.HeaderCell>
          <Table.HeaderCell>File</Table.HeaderCell>
          <Table.HeaderCell>Alt</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {product?.product_files?.map((productFileItem, index) => {
          return (
            <FileTableRow
              key={index}
              index={index}
              productFile={productFileItem}
              product={product}
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
  product,
}: {
  productFile: ProductFileType;
  index: number;
  product: AdminProductWithProductFiles;
}) => {
  const deleteProductFileMutation = useDeleteProductFile();

  return (
    <Table.Row>
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell>
        <Thumbnail src={productFile.file_url} alt={productFile.alt} />
      </Table.Cell>
      <Table.Cell className="w-full">{productFile.alt}</Table.Cell>
      <Table.Cell>
        <Menu
          onClickMenuEdit={() => {}}
          onClickMenuDelete={() => {
            deleteProductFileMutation.mutate({
              product,
              deletedProductId: productFile.id,
            });
          }}
        />
      </Table.Cell>
    </Table.Row>
  );
};
