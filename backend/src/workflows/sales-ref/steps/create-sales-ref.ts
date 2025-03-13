import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { SALES_REF_MODULE } from "src/modules/sales-ref";

import SalesRefModuleService from "../../../modules/sales-ref/service";
import { ModuleCreateSalesRef } from "@starter/types/sales-ref/module";

export const createSalesRefStep = createStep(
  // Param1: Step unique name
  "create-sales-ref-step",

  // Param2: Step function (Main Function)
  async (
    // input passed to this function when invoked
    input: ModuleCreateSalesRef,
    // this object contain general context of medusa framework
    { container }
  ) => {
    // Register the customer modules and the services
    const salesRefModuleService: SalesRefModuleService =
      container.resolve(SALES_REF_MODULE);

    // Invoke the service function
    const salesRef = await salesRefModuleService.createSalesRefs(input);

    // should return instance of step response
    return new StepResponse(
      salesRef, // data returned by the step
      salesRef.id // data that will be passed to the compensation function
    );
  },

  // Param3: Compensation Function: Executed when error occurs. It should define the logic to roll-back the changes made by the step source: https://docs.medusajs.com/learn/customization/custom-features/workflow#add-compensation-function-to-step
  async (
    id: string, // The id that passed as second parameters on the returned StepResponse()
    { container }
  ) => {
    const brandModuleService: SalesRefModuleService =
      container.resolve(SALES_REF_MODULE);

    await brandModuleService.softDeleteSalesRefs(id);
  }
);
