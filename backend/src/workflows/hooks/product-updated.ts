import { MedusaContainer } from "@medusajs/framework";
import { LinkDefinition, ProductDTO } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { StepResponse, WorkflowData } from "@medusajs/framework/workflows-sdk";
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";

type LinkHandlerFunctionType = (props: {
  products: WorkflowData<ProductDTO[]>;
  container: MedusaContainer;
  additional_data: any;
}) => Promise<LinkDefinition[]>;

const handleBrandLinkUpdate: LinkHandlerFunctionType = async ({
  products,
  container,
  additional_data,
}) => {
  if (!additional_data?.brand_id) return [];

  const query = container.resolve("query");
  const link = container.resolve("link");

  const brandModuleService: BrandModuleService =
    container.resolve(BRAND_MODULE);
  await brandModuleService.retrieveBrand(additional_data.brand_id as string);
  const links: LinkDefinition[] = [];

  for (const product of products) {
    // ?query source https://docs.medusajs.com/learn/fundamentals/module-links/query#apply-filters
    const productDetail = await query
      .graph({
        entity: "product",
        filters: {
          id: product.id,
        },
        fields: ["*", "brand.*"],
      })
      .then((res) => res.data[0]);

    // Check if the brand_id is not changed
    if (productDetail?.brand?.id === additional_data.brand_id) {
      return [];
    } else {
      const dismissSingleModuleLinkedToProduct = async ({
        productId,
        brandId,
      }: {
        productId: string;
        brandId: string;
      }) => {
        await link.dismiss({
          [Modules.PRODUCT]: {
            product_id: productId,
          },
          [BRAND_MODULE]: {
            brand_id: brandId,
          },
        });
      };

      if (productDetail?.brand && Array.isArray(productDetail?.brand)) {
        await Promise.all(
          // ? the brand can be multiple, probably this is bug from medusa so we map it here
          //@ts-ignore
          productDetail?.brand?.map(
            async (brandItem) =>
              await dismissSingleModuleLinkedToProduct({
                productId: product.id,
                brandId: brandItem.id,
              })
          )
        );
      } else if (productDetail?.brand) {
        await dismissSingleModuleLinkedToProduct({
          productId: product.id,
          brandId: productDetail?.brand?.id,
        });
      }
    }

    // ? Link to another product
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

    const newBrandLinks = await handleBrandLinkUpdate({
      products,
      container,
      additional_data,
    });

    const links: LinkDefinition[] = [...newBrandLinks];

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
