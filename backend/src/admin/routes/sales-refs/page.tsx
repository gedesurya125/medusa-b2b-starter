// ? Add Custom Field: Step 14: Add the Brands page to show the paginated brands

import { defineRouteConfig } from "@medusajs/admin-sdk";
import { User } from "@medusajs/icons";
import { Container } from "../../../../src/admin/components/common/Container";
import { SalesRefTable } from "./components/sales-ref-table";
import { SalesRefAddDrawer } from "./components/sales-ref-add-drawer";
import { useToggleState } from "@medusajs/ui";

const BrandsPage = () => {
  const [isDrawerOpen, openDrawer, closeDrawer, toggleDrawer] =
    useToggleState();

  return (
    <Container title="Sales Refs" onClickMenuAdd={openDrawer}>
      <SalesRefTable />
      <SalesRefAddDrawer open={isDrawerOpen} onOpenChange={toggleDrawer} />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Sales Ref",
  icon: User,
});

export default BrandsPage;
