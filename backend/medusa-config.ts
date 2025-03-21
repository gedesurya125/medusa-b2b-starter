import { QUOTE_MODULE } from "./src/modules/quote";
import { APPROVAL_MODULE } from "./src/modules/approval";
import { COMPANY_MODULE } from "./src/modules/company";
import { loadEnv, defineConfig, Modules } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "./src/modules/brand";
import { BC_PRODUCT_INFO_MODULE } from "src/modules/bcProductInfo";
import { PRODUCT_FILE_MODULE } from "src/modules/product-file";
import { PRODUCT_VIDEO_MODULE } from "src/modules/product-video";
import { SALES_REF_MODULE } from "src/modules/sales-ref";

loadEnv(process.env.NODE_ENV!, process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    [COMPANY_MODULE]: {
      resolve: "./modules/company",
    },
    [QUOTE_MODULE]: {
      resolve: "./modules/quote",
    },
    [APPROVAL_MODULE]: {
      resolve: "./modules/approval",
    },
    [Modules.CACHE]: {
      resolve: "@medusajs/medusa/cache-inmemory",
    },
    [Modules.WORKFLOW_ENGINE]: {
      resolve: "@medusajs/medusa/workflow-engine-inmemory",
    },
    // ? Add Custom Field: Step 4: Add the module to the medusa configuration,
    // ? Add Custom Field: Step 5: Then run command `npx medusa db:generate module_name` to generate the migration
    // ? Add Custom Field: Step 6: Then run command  `npx medusa db:migrate` to run all migration that haven't run yet in the medusa application
    [BRAND_MODULE]: {
      resolve: "./modules/brand",
    },
    [BC_PRODUCT_INFO_MODULE]: {
      resolve: "./src/modules/bcProductInfo",
    },
    [PRODUCT_FILE_MODULE]: {
      resolve: "./src/modules/product-file",
    },
    [PRODUCT_VIDEO_MODULE]: {
      resolve: "./src/modules/product-video",
    },
    [SALES_REF_MODULE]: {
      resolve: "./src/modules/sales-ref",
    },
  },
});
