// ? Add Custom Field: Step 14: add the widget to the product page https://docs.medusajs.com/learn/customization/customize-admin/widget#2-add-widget-to-product-details-page

import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types";
import { Button, clx, Container, Heading, Select, Text } from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { Drawer } from "@medusajs/ui";
import { useBrands } from "../routes/brands/components/useBrands";

type AdminProductBrand = AdminProduct & {
  brand?: {
    id: string;
    name: string;
  };
};

const ProductBrandWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { data: queryResult } = useQuery({
    queryFn: () =>
      sdk.admin.product.retrieve(product.id, {
        fields: "+brand.*",
      }),
    queryKey: [["product", product.id]],
  });
  const brandName = (queryResult?.product as AdminProductBrand)?.brand?.name;

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Brand</Heading>
        </div>
        <EditButton />
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Text size="small" weight="plus" leading="compact">
          Name
        </Text>

        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {brandName || "-"}
        </Text>
      </div>
    </Container>
  );
};

const EditButton = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        <Button size="small" variant="secondary">
          Edit
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditDrawerBody />
        </Drawer.Body>
        <Drawer.Footer>Footer</Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

const EditDrawerBody = () => {
  const { data } = useBrands({ limit: 20, offset: 0 });

  return (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder="Select a currency" />
      </Select.Trigger>
      <Select.Content>
        {data?.brands.map((item) => (
          <Select.Item key={item.id} value={item.name}>
            {item.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductBrandWidget;
