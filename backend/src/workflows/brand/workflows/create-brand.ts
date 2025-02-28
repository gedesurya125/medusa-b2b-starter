// ? Add Custom Field: Step 7: source: https://docs.medusajs.com/learn/customization/custom-features/workflow#1-create-createbrandstep
// ?
import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "../../../modules/brand";
import BrandModuleService from "../../../modules/brand/service";

export type CreateBrandStepInput = {
  name: string;
  documentUrl?: string | null;
};

export const createBrandStep = createStep(
  // Param1: Step unique name
  "create-brand-step",

  // Param2: Step function (Main Function)
  async (
    // input passed to this function when invoked
    input: CreateBrandStepInput,
    // this object contain general context of medusa framework
    { container }
  ) => {
    // Register the customer modules and the services
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    // Invoke the service function
    const brand = await brandModuleService.createBrands(input);

    // should return instance of step response
    return new StepResponse(
      brand, // data returned by the step
      brand.id // data that will be passed to the compensation function
    );
  },

  // Param3: Compensation Function: Executed when error occurs. It should define the logic to roll-back the changes made by the step source: https://docs.medusajs.com/learn/customization/custom-features/workflow#add-compensation-function-to-step
  async (
    id: string, // The brand.id that passed as second parameters on the returned StepResponse()
    { container }
  ) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    await brandModuleService.deleteBrands(id);
  }
);

// ? Add Custom Field: Step 8: Create the brand workflow https://docs.medusajs.com/learn/customization/custom-features/workflow#2-create-createbrandworkflow
type CreateBrandWorkflowInput = {
  name: string;
  documentUrl?: string | null;
};

// ? MAIN MODULE
export const createBrandWorkflow = createWorkflow(
  // unique workflow name
  "create-brand",

  // workflow constructor function holding the implementation
  (input: CreateBrandWorkflowInput) => {
    //invoke the step function
    const brand = createBrandStep(input);

    // must return an instance of Workflow response
    return new WorkflowResponse(brand);
  }
);
