// ? Add Custom Field: Step 11: Extend the create product flow
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
import { BRAND_MODULE } from "../../modules/brand";
import BrandModuleService from "../../modules/brand/service";

createProductsWorkflow.hooks.productsCreated(
  // Step function
  async ({ products, additional_data }, { container }) => {
    // Consume the product hooks source https://docs.medusajs.com/learn/customization/extend-features/extend-create-product#1-consume-the-productscreated-hook
    // this function get the brand id when a product is created from the additional_data
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }

    // get the brand module services
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    // if the brand doesn't exist, an error is thrown.
    await brandModuleService.retrieveBrand(additional_data.brand_id as string);

    // link brand to product
    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    // TODO: question ? why we loop over all the products and assign for a brand
    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      });
    }

    await link.create(links);

    logger.info("Linked brand to products");

    return new StepResponse(links, links); //? the second parameter is passed to the compensation function
  },

  // Compensation function
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve("link");

    await link.dismiss(links);
  }
);
