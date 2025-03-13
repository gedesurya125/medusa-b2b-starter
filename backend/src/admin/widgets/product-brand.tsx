// ? Add Custom Field: Step 14: add the widget to the product page https://docs.medusajs.com/learn/customization/customize-admin/widget#2-add-widget-to-product-details-page

import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types";
import {
  Button,
  clx,
  Container,
  Heading,
  Input,
  Select,
  Text,
} from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { Drawer } from "@medusajs/ui";
import {
  Brand,
  BrandsResponse,
  useBrands,
} from "../routes/brands/components/useBrands";
import { useState } from "react";

type AdminProductBrandWithBcProductInfo = AdminProduct & {
  brand?: {
    id: string;
    name: string;
  };
  bc_product_info: {
    id: string;
    bc_product_id: string;
  };
};

const ProductBrandWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { data: queryResult } = useQuery({
    queryFn: () =>
      sdk.admin.product.retrieve(product.id, {
        fields: "+bc_product_info.*,+brand.*",
      }),
    queryKey: [["product", product.id]],
  });
  const brandName = (queryResult?.product as AdminProductBrandWithBcProductInfo)
    ?.brand?.name;
  const bcProductId = (
    queryResult?.product as AdminProductBrandWithBcProductInfo
  )?.bc_product_info?.bc_product_id;

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Custom Fields</Heading>
        </div>
        <EditButton product={product} />
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Text size="small" weight="plus" leading="compact">
          Brand Name :
        </Text>

        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {brandName || "-"}
        </Text>
        <Text size="small" weight="plus" leading="compact">
          Business Central Product Id :
        </Text>

        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {bcProductId || "-"}
        </Text>
      </div>
    </Container>
  );
};

const EditButton = ({ product }: { product: AdminProduct }) => {
  const [formData, setFormData] = useState({ brand: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { data } = useBrands({ limit: 20, offset: 0 });

  // ? Sending the request to the custom route need to use sdk.client.fetch https://docs.medusajs.com/resources/js-sdk#send-requests-to-custom-routes
  const handleProductUpdate = async () => {
    const updatedProduct = await sdk.client.fetch(
      `/admin/products/${product.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          additional_data: {
            brand_id: data?.brands.find(
              (brandItem) => brandItem.name === formData.brand
            )?.id,
          },
        },
      }
    );

    return updatedProduct;
  };

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
          <EditDrawerBody
            brandOptions={data?.brands}
            selectedBrand={formData.brand}
            setSelectedBrand={setFormData}
            handleChange={handleChange}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button onClick={handleProductUpdate}>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

const EditDrawerBody = ({
  selectedBrand,
  setSelectedBrand,
  brandOptions,
}: {
  selectedBrand: string;
  setSelectedBrand: any;
  brandOptions?: Brand[];
  handleChange?: (e: any) => void;
}) => {
  return (
    <>
      <Select
        name="brand"
        value={selectedBrand}
        onValueChange={(value) => {
          setSelectedBrand(value);
        }}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select a brand" />
        </Select.Trigger>
        <Select.Content>
          {brandOptions?.map((item) => (
            <Select.Item key={item.id} value={item.name}>
              {item.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <Input placeholder="Sales Channel Name" id="sales-channel-name" />
    </>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductBrandWidget;
