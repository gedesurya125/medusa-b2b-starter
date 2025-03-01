import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { PRODUCT_FILE_MODULE } from "src/modules/product-file";
import ProductFileService from "src/modules/product-file/service";

export type CreateProductFileStepInput = {
  file_url: string;
  alt: string;
};

export const createProductFileStep = createStep(
  "create-product-file-step",
  async (input: CreateProductFileStepInput, { container }) => {
    const productFileModuleService: ProductFileService =
      container.resolve(PRODUCT_FILE_MODULE);

    const productFile = await productFileModuleService.createProductFiles(
      input
    );

    return new StepResponse(productFile, productFile.id);
  },
  // Compensation function
  async (id: string, { container }) => {
    const productFileModuleService: ProductFileService =
      container.resolve(PRODUCT_FILE_MODULE);
    await productFileModuleService.deleteProductFiles(id);
  }
);

type CreateProductFileWorkflowInput = {
  file_url: string;
  alt: string;
};

export const createProductFileWorkflow = createWorkflow(
  "create-product-file",
  (input: CreateProductFileWorkflowInput) => {
    const productFile = createProductFileStep(input);

    return new WorkflowResponse(productFile);
  }
);
