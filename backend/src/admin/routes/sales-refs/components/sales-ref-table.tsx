import { useSalesRefs } from "../../../hooks/api/salesRefs";
import { DataTable } from "../../../../admin/components";
import { useDataTable } from "../../../../admin/hooks";
import { useSalesRefTableColumns } from "./table/columns";
import { useSalesRefTableFilters } from "./table/filters";
import { useSalesRefTableQuery } from "./table/query";

const PAGE_SIZE = 50;
const PREFIX = "quo";

export const SalesRefTable = () => {
  const { searchParams, raw } = useSalesRefTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX,
  });

  const {
    salesRefs = [],
    count,
    isPending,
  } = useSalesRefs({
    ...searchParams,
    order: "-created_at",
  });

  const columns = useSalesRefTableColumns();
  const filters = useSalesRefTableFilters();

  const { table } = useDataTable({
    data: salesRefs,
    columns,
    enablePagination: true,
    count,
    pageSize: PAGE_SIZE,
  });

  console.log("this is the sales refs", salesRefs);

  return (
    <div className="flex size-full flex-col overflow-hidden">
      <DataTable
        columns={columns}
        table={table}
        pagination
        navigateTo={(row) => `/sales-refs/${row.original.id}`}
        filters={filters}
        count={count}
        search
        isLoading={isPending}
        pageSize={PAGE_SIZE}
        orderBy={["id", "created_at"]}
        queryObject={raw}
        noRecords={{
          title: "No quotes found",
          message:
            "There are currently no quotes. Create one from the storefront.",
        }}
      />
    </div>
  );
};
