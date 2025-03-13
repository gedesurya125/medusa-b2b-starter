import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { TextCell } from "../../../../components/common/table/table-cells/text-cell";

const columnHelper = createColumnHelper<any>();

export const useSalesRefTableColumns = () => {
  // TODO: move the header name to the i18n
  return useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "id",
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
      columnHelper.accessor("username", {
        header: "Username",
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
      columnHelper.accessor("password", {
        header: "Password",
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
      columnHelper.accessor("bc_sales_code", {
        header: "BC Sales Code",
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
    ],
    []
  );
};
