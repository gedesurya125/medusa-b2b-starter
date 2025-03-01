import { defineLink } from "@medusajs/framework/utils";
import ProductFileModule from "../modules/product-file";
import ProductModule from "@medusajs/medusa/product";

export default defineLink(ProductModule.linkable.product, {
  linkable: ProductFileModule.linkable.productFile,
  isList: true,
});

// ? if we want to retrieve the product_file in when we fetch the product we should use plural as product can be linked to many product_file
// ? so it become http://localhost:9000/admin/products?fields=+product_files.*
