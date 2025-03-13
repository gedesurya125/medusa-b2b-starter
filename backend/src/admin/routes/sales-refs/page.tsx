// ? Add Custom Field: Step 14: Add the Brands page to show the paginated brands

import { defineRouteConfig } from "@medusajs/admin-sdk";
import { User } from "@medusajs/icons";
import { Container } from "../../../../src/admin/components/common/Container";
import { SalesRefTable } from "./components/sales-ref-table";

const BrandsPage = () => {
  return (
    <Container title="Sales Refs">
      {" "}
      <SalesRefTable />{" "}
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Sales Ref",
  icon: User,
});

export default BrandsPage;
