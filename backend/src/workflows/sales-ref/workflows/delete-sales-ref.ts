import { WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { createWorkflow } from "@medusajs/workflows-sdk";
import { ModuleDeleteSalesRef } from "@starter/types/sales-ref";
import { deleteSalesRefStep } from "../steps/delete-sales-ref";

export const deleteSalesRefWorkflow = createWorkflow(
  "delete-sales-ref",
  function (input: ModuleDeleteSalesRef) {
    deleteSalesRefStep([input.id]);
    return new WorkflowResponse(undefined);
  }
);
