import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { BC_PRODUCT_INFO_MODULE } from "src/modules/bcProductInfo";
import BcProductInfoService from "src/modules/bcProductInfo/service";

export type CreateBcProductInfoStepInput = {
  bcProductId: string;
};

export const createBcProductInfoStep = createStep(
  "create-bc_product_info-step",
  async (input: CreateBcProductInfoStepInput, { container }) => {
    const bcProductInfoModuleService: BcProductInfoService = container.resolve(
      BC_PRODUCT_INFO_MODULE
    );

    // @ts-ignore: Bug in medusa, it auto generated the createBcProductInfoes types, but the actual function name is createBcProductInfos
    const bcProductInfo = await bcProductInfoModuleService.createBcProductInfos(
      input
    );

    return new StepResponse(bcProductInfo, bcProductInfo.id);
  },
  // Compensation Function
  async (id: string, { container }) => {
    const bcProductInfoModuleServices: BcProductInfoService = container.resolve(
      BC_PRODUCT_INFO_MODULE
    );
    // @ts-ignore: Bug in medusa, it auto generated the deleteBcProductInfoes types, but the actual function name is deleteBcProductInfos
    await bcProductInfoModuleServices.deleteBcProductInfos(id);
  }
);

type CreateBrandWorkflowInput = {
  bcProductId: string;
};

export const createBcProductInfoWorkflow = createWorkflow(
  "create-bc_product_info",
  (input: CreateBrandWorkflowInput) => {
    const bcProductInfo = createBcProductInfoStep(input);

    return new WorkflowResponse(bcProductInfo);
  }
);
