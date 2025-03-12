// TODO: update this function file name to be product-created
// ? Add Custom Field: Step 11: Extend the create product flow
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { StepResponse, WorkflowData } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition, ProductDTO } from "@medusajs/framework/types";
import { BRAND_MODULE } from "../../modules/brand";
import BrandModuleService from "../../modules/brand/service";
import { MedusaContainer } from "@medusajs/framework";
import { BC_PRODUCT_INFO_MODULE } from "src/modules/bcProductInfo";
import BcProductInfoService from "src/modules/bcProductInfo/service";
import ProductFileService from "src/modules/product-file/service";
import { PRODUCT_FILE_MODULE } from "src/modules/product-file";

type LinkHandlerFunctionType = (props: {
  products: WorkflowData<ProductDTO[]>;
  container: MedusaContainer;
  additional_data: any;
}) => Promise<LinkDefinition[]>;

const handleBrandLink: LinkHandlerFunctionType = async ({
  products,
  container,
  additional_data,
}) => {
  if (!additional_data?.brand_id) return [];

  // get the brand module services
  const brandModuleService: BrandModuleService =
    container.resolve(BRAND_MODULE);

  // if the brand doesn't exist, an error is thrown.
  await brandModuleService.retrieveBrand(additional_data?.brand_id as string);

  const links: LinkDefinition[] = [];
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
  return links;
};

const handleBcProductInfoLink: LinkHandlerFunctionType = async ({
  products,
  container,
  additional_data,
}) => {
  if (!additional_data?.bc_product_info_id) return [];

  // get the brand module services
  const bcProductInfoModuleService: BcProductInfoService = container.resolve(
    BC_PRODUCT_INFO_MODULE
  );

  // if the brand doesn't exist, an error is thrown.
  await bcProductInfoModuleService.retrieveBcProductInfo(
    additional_data?.bc_product_info_id as string
  );

  const links: LinkDefinition[] = [];
  for (const product of products) {
    links.push({
      [Modules.PRODUCT]: {
        product_id: product.id,
      },
      [BC_PRODUCT_INFO_MODULE]: {
        bc_product_info_id: additional_data.bc_product_info_id, //? the link object name is snake_case + _id source https://docs.medusajs.com/learn/customization/extend-features/extend-create-product#link-brand-to-product
      },
    });
  }
  return links;
};

const handleProductFileLink: LinkHandlerFunctionType = async ({
  products,
  container,
  additional_data,
}) => {
  if (!additional_data?.product_file_ids) return [];

  const productFileModuleService: ProductFileService =
    container.resolve(PRODUCT_FILE_MODULE);

  const links: LinkDefinition[] = [];
  //  if the product file doesn't exist, an error is thrown

  for (const product_file_id of additional_data?.product_file_ids) {
    await productFileModuleService.retrieveProductFile(product_file_id);
    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [PRODUCT_FILE_MODULE]: {
          product_file_id: product_file_id,
        },
      });
    }
  }

  return links;
};

createProductsWorkflow.hooks.productsCreated(
  // Step function
  async ({ products, additional_data }, { container }) => {
    // Consume the product hooks source https://docs.medusajs.com/learn/customization/extend-features/extend-create-product#1-consume-the-productscreated-hook
    // this function get the brand id when a product is created from the additional_data
    const brandLinks = await handleBrandLink({
      products,
      container,
      additional_data,
    });

    const bcProductInfoLinks = await handleBcProductInfoLink({
      products,
      container,
      additional_data,
    });

    const productFileLinks = await handleProductFileLink({
      products,
      container,
      additional_data,
    });

    const links = [...brandLinks, ...bcProductInfoLinks, ...productFileLinks];
    const link = container.resolve("link");
    const logger = container.resolve("logger");
    await link.create(links);
    logger.info("Linked brand or bc product info to products");
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
