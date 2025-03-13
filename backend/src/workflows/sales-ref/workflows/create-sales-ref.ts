// ? Add Custom Field: Step 8: source: https://docs.medusajs.com/learn/customization/custom-features/workflow#1-create-createbrandstep
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";

import { ModuleCreateSalesRef } from "@starter/types/sales-ref/module";
import { createSalesRefStep } from "../steps/create-sales-ref";

// ? MAIN MODULE
export const createSalesRefWorkflow = createWorkflow(
  // unique workflow name
  "create-sales-ref",

  // workflow constructor function holding the implementation
  (input: ModuleCreateSalesRef) => {
    //invoke the step function
    const salesRef = createSalesRefStep(input);

    // must return an instance of Workflow response
    return new WorkflowResponse(salesRef);
  }
);
