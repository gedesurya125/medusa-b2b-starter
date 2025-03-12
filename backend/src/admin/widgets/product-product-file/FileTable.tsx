import { Button, Table, Text } from "@medusajs/ui";

import { Thumbnail } from "../../components";
import { ProductFileType } from "./types";
import { Trash } from "@medusajs/icons";
import { Menu } from "../../../../src/admin/components/common/Container";

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
          <Table.HeaderCell></Table.HeaderCell>
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
      <Table.Cell className="w-full">{productFile.alt}</Table.Cell>
      <Table.Cell>
        <Menu onClickMenuEdit={() => {}} onClickMenuDelete={() => {}} />
      </Table.Cell>
    </Table.Row>
  );
};
