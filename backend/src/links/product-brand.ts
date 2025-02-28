// ? Add Custom Field: Step 10: Define the link between product data model of product module and brand  data model of brand module source: https://docs.medusajs.com/learn/customization/extend-features/define-link#1-define-link
// ? the file name indicate the link between modules "product-brand"

import BrandModule from "../modules/brand";
import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true, // ? it indicates many to one, since single brand can be associated to multiple products
  },
  BrandModule.linkable.brand
);

// ? Add Custom Field: 11: sync the link to the database source: https://docs.medusajs.com/learn/customization/extend-features/define-link#2-sync-the-link-to-the-database
// ? run the  `npx medusa db:migrate`
