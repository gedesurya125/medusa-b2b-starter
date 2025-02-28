import { LinkProductProductBrandBrand } from ".medusa/types/query-entry-points";
import { LinkDefinition } from "@medusajs/framework/types";
import { Module, Modules } from "@medusajs/framework/utils";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";

updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }

    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    // if the brand doesn't exist, an error is thrown.
    await brandModuleService.retrieveBrand(additional_data.brand_id as string);

    // link brand to product
    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    for (const product of products) {
      // ? remove old linked brand or brands

      // Get brand linked to for the product

      // link.dismiss({
      //   [Modules.PRODUCT]: {
      //     product_id: product.id,
      //   },
      //   [BRAND_MODULE]: {
      //     brand_id: "*",
      //   },
      // });

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
    logger.info(`Linked brand to products ${JSON.stringify(link, null, 2)}`);
    return new StepResponse(links, links); //? the second parameter is passed to the compensation function source: https://docs.medusajs.com/learn/customization/extend-features/extend-create-product#link-brand-to-product
  },

  async (links, { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve("link");

    await link.dismiss(links);
  }
);
