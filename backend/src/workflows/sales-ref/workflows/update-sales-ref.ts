import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { ModuleUpdateSalesRef } from "../../../types";
import { updateSalesRefStep } from "../steps/update-sales-ref";

export const updateCompaniesWorkflow = createWorkflow(
  "update-sales-ref",
  function (input: ModuleUpdateSalesRef) {
    return new WorkflowResponse(updateSalesRefStep(input));
  }
);

// TODO: CONTINUE CREATE UPDATE SALES REF FROM HERE TO ADD COMPANIES WHEN UPDATING THE SALES REF
