import { Product } from ".medusa/types/query-entry-points";
import { MedusaContainer } from "@medusajs/framework";
import { LinkDefinition } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";
import { BC_PRODUCT_INFO_MODULE } from "src/modules/bcProductInfo";
import BcProductInfoService from "src/modules/bcProductInfo/service";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";
import { PRODUCT_FILE_MODULE } from "src/modules/product-file";
import ProductFileService from "src/modules/product-file/service";

type SingleProductLinkUpdateFunctionType = (props: {
  productDetail: Product;
  additional_data: any;
  container: MedusaContainer;
}) => Promise<LinkDefinition | null>;
type MultipleProductLinkUpdateFunctionType = (props: {
  productDetail: Product;
  additional_data: any;
  container: MedusaContainer;
}) => Promise<LinkDefinition[] | null>;

// Reusable Function
//? Regular function is Accessible before initialization
async function dismissSingleModuleLinkedToProduct({
  productId,
  moduleId,
  container,
  moduleKey,
  moduleName,
}: {
  productId: string;
  moduleId: string;
  container: MedusaContainer;
  moduleKey: string;
  moduleName: string;
}) {
  const link = container.resolve("link");

  await link.dismiss({
    [Modules.PRODUCT]: {
      product_id: productId,
    },
    [moduleName]: {
      [moduleKey]: moduleId,
    },
  });
}

async function getProductDetailById({
  productId,
  container,
}: {
  productId: string;
  container: MedusaContainer;
}) {
  const query = container.resolve("query");

  // ? query source https://docs.medusajs.com/learn/fundamentals/module-links/query#apply-filters
  return await query
    .graph({
      entity: "product",
      filters: {
        id: productId,
      },
      fields: ["*", "brand.*", "bc_product_info.*", "product_files.*"],
    })
    .then((res) => res.data[0]);
}

// Handler function

const handleSingleProductBrandLinkUpdate: SingleProductLinkUpdateFunctionType =
  async ({ productDetail, additional_data, container }) => {
    if (
      !productDetail?.brand ||
      productDetail?.brand?.id === additional_data?.brand_id
    )
      return null;

    const dismissSingleBrandLinkedToProduct = async ({
      brandId,
    }: {
      brandId: string;
    }) =>
      await dismissSingleModuleLinkedToProduct({
        container,
        productId: productDetail.id,
        moduleName: BRAND_MODULE,
        moduleKey: "brand_id",
        moduleId: brandId,
      });

    if (Array.isArray(productDetail?.brand)) {
      await Promise.all(
        productDetail?.brand?.map(
          async (brandItem) =>
            await dismissSingleBrandLinkedToProduct({ brandId: brandItem.id })
        )
      );
    } else {
      await dismissSingleBrandLinkedToProduct({
        brandId: productDetail?.brand?.id,
      });
    }

    return {
      [Modules.PRODUCT]: {
        product_id: productDetail.id,
      },
      [BRAND_MODULE]: {
        brand_id: additional_data.brand_id,
      },
    };
  };

const handleSingleBcProductInfoLinkUpdate: SingleProductLinkUpdateFunctionType =
  async ({ productDetail, additional_data, container }) => {
    if (
      !productDetail?.bc_product_info ||
      productDetail?.bc_product_info?.id === additional_data?.bc_product_info_id
    )
      return null;

    const dismissSingleBcProductInfoLinkedToProduct = async ({
      bcProductInfoId,
    }: {
      bcProductInfoId: string;
    }) => {
      return await dismissSingleModuleLinkedToProduct({
        container,
        productId: productDetail.id,
        moduleName: BC_PRODUCT_INFO_MODULE,
        moduleKey: "bc_product_info_id",
        moduleId: bcProductInfoId,
      });
    };

    if (Array.isArray(productDetail?.bc_product_info)) {
      await Promise.all(
        productDetail?.bc_product_info?.map(
          async (bcProductInfoItem) =>
            await dismissSingleBcProductInfoLinkedToProduct({
              bcProductInfoId: bcProductInfoItem.id,
            })
        )
      );
    } else {
      await dismissSingleBcProductInfoLinkedToProduct({
        bcProductInfoId: productDetail?.bc_product_info?.id,
      });
    }

    return {
      [Modules.PRODUCT]: {
        product_id: productDetail.id,
      },
      [BC_PRODUCT_INFO_MODULE]: {
        bc_product_info_id: additional_data.bc_product_info_id,
      },
    };
  };

const handleProductFilesLinkUpdate: MultipleProductLinkUpdateFunctionType =
  async ({ productDetail, additional_data, container }) => {
    // TODO: Handle remove the file that not used anymore
    const hasProductFilesLinkedToProduct =
      productDetail?.product_files &&
      productDetail?.product_files &&
      productDetail.product_files.length > 0;

    if (hasProductFilesLinkedToProduct) {
      const dismissSingleFileLinkedToProduct = async ({
        fileId,
      }: {
        fileId: string;
      }) => {
        return await dismissSingleModuleLinkedToProduct({
          container,
          productId: productDetail.id,
          moduleName: PRODUCT_FILE_MODULE,
          moduleKey: "product_file_id", //? every module has _id key https://docs.medusajs.com/learn/customization/extend-features/extend-create-product#link-brand-to-product
          moduleId: fileId,
        });
      };

      if (Array.isArray(productDetail.product_files)) {
        await Promise.all(
          productDetail.product_files.map(async (productFile) => {
            if (!productFile) return;
            return await dismissSingleFileLinkedToProduct({
              fileId: productFile.id,
            });
          })
        );
      }
    }

    if (Array.isArray(additional_data?.product_file_ids)) {
      const links: LinkDefinition[] = [];
      additional_data.product_file_ids.forEach((productFileId: string) => {
        links.push({
          [Modules.PRODUCT]: {
            product_id: productDetail.id,
          },
          [PRODUCT_FILE_MODULE]: {
            product_file_id: productFileId,
          },
        });
      });

      return links;
    }
    return null;
  };

// Main function
//? Additional data property https://docs.medusajs.com/learn/fundamentals/workflows/workflow-hooks#additional-data-property
updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    const hasBrandId = additional_data?.brand_id;
    const hasProductInfoId = additional_data?.bc_product_info_id;
    const hasProductFileIds =
      additional_data?.product_file_ids &&
      Array.isArray(additional_data?.product_file_ids) &&
      additional_data?.product_file_ids?.length > 0;

    if (!hasBrandId && !hasProductInfoId && !hasProductFileIds) {
      return new StepResponse([], []);
    }

    // ? Module Record Existence Checker Section
    if (hasBrandId) {
      const brandModuleService: BrandModuleService =
        container.resolve(BRAND_MODULE);
      await brandModuleService.retrieveBrand(
        additional_data.brand_id as string
      );
    }

    if (hasProductInfoId) {
      const bcProductInfoService: BcProductInfoService = container.resolve(
        BC_PRODUCT_INFO_MODULE
      );
      await bcProductInfoService.retrieveBcProductInfo(
        additional_data.bc_product_info_id as string
      );
    }

    if (hasProductFileIds) {
      const productFileService: ProductFileService =
        container.resolve(PRODUCT_FILE_MODULE);

      for (const productFileId of additional_data?.product_file_ids as string[]) {
        await productFileService.retrieveProductFile(productFileId);
      }
    }

    // ? Linking Section
    const link = container.resolve("link");

    const links: LinkDefinition[] = [];

    for (const product of products) {
      //  NOTE we cannot follow the product-created hook code structure because  we need to fetch the product detail
      const productDetail = await getProductDetailById({
        productId: product.id,
        container,
      });

      const productBrandLink = await handleSingleProductBrandLinkUpdate({
        productDetail,
        additional_data,
        container,
      });
      if (productBrandLink) links.push(productBrandLink);

      const bcProductInfoLink = await handleSingleBcProductInfoLinkUpdate({
        productDetail,
        additional_data,
        container,
      });
      if (bcProductInfoLink) links.push(bcProductInfoLink);

      const productFileLinks = await handleProductFilesLinkUpdate({
        productDetail,
        additional_data,
        container,
      });

      if (productFileLinks) links.push(...productFileLinks);
    }

    await link.create(links);
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
