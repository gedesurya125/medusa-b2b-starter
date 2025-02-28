// ? Add Custom Field: Step 14: Add the Brands page to show the paginated brands

import { defineRouteConfig } from "@medusajs/admin-sdk";
import { TagSolid } from "@medusajs/icons";
import {
  Container,
  Heading,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  useDataTable,
  Drawer,
  Button,
  Text,
  Label,
  Input,
} from "@medusajs/ui";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { sdk } from "../../lib/sdk";
import { useMemo, useState } from "react";
import { FetchError } from "@medusajs/js-sdk";
import { brandQueryKey, useBrands } from "./components/useBrands";

type Brand = {
  id: string;
  name: string;
};

const columnHelper = createDataTableColumnHelper<Brand>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
];

const BrandsPage = () => {
  const limit = 15;
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  });
  const offset = useMemo(() => {
    return pagination.pageIndex * limit;
  }, [pagination]);

  const { data, isLoading } = useBrands({ limit, offset });

  const table = useDataTable({
    columns,
    data: data?.brands || [],
    getRowId: (row) => row.id,
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  });

  return (
    <Container className="divide-y p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <Heading>Brands</Heading>
          <AddDrawerButton />
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  );
};

type AdminCreateBrand = {
  name: string;
};
type AdminBrandResponse = any;

const useCreateBrand = (
  options?: UseMutationOptions<AdminBrandResponse, FetchError, AdminCreateBrand>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brand: AdminCreateBrand) =>
      sdk.client.fetch("/admin/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: brand,
      }),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: brandQueryKey.lists() });
      queryClient.invalidateQueries({
        queryKey: brandQueryKey.detail(data.id),
      });
      options;
    },
  });
};

const AddDrawerButton = () => {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending, error } = useCreateBrand();

  const handleSubmit = async (formData: AdminCreateBrand) => {
    await mutateAsync(formData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button size="small" variant="secondary">
          Add
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Add Brand</Drawer.Title>
        </Drawer.Header>
        <BrandForm
          handleSubmit={handleSubmit}
          loading={isPending}
          error={error}
        />
      </Drawer.Content>
    </Drawer>
  );
};

const BrandForm = ({
  handleSubmit,
  loading,
  error,
}: {
  handleSubmit: (data: AdminCreateBrand) => Promise<void>; //TODO: update the data
  loading?: boolean;
  error?: Error | null;
}) => {
  const [formData, setFormData] = useState<any>({} as any);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Drawer.Body className="p-4 flex flex-col gap-2">
        <Label size="xsmall">Brand Name</Label>
        <Input
          type="text"
          name="name"
          value={formData?.name || ""}
          onChange={handleChange}
          placeholder="Brand Name"
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.Close asChild>
          <Button variant="secondary">Cancel</Button>
        </Drawer.Close>
        <Button onClick={() => handleSubmit(formData)} isLoading={loading}>
          Save
        </Button>
        {error && (
          <Text className="txt-compact-small text-ui-fg-warning">
            Error: {error?.message}
          </Text>
        )}
      </Drawer.Footer>
    </>
  );
};

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid,
});

export default BrandsPage;
