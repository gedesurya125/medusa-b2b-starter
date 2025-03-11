import { Table } from "@medusajs/ui";

import { Thumbnail } from "../../components";
import { ProductFileType } from "./types";

export const FileTable = ({
  productFiles,
}: {
  productFiles: ProductFileType[];
}) => {
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
