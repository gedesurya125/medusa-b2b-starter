import BcProductInfoModule from "../modules/bcProductInfo";
import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BcProductInfoModule.linkable.bcProductInfo
);

// ? We should run npx medusa db:migrate after creating this link file
