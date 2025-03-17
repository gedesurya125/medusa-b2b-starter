import { dismissRemoteLinkStep } from "@medusajs/medusa/core-flows";
import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { COMPANY_MODULE } from "../../../modules/company";
import { SALES_REF_MODULE } from "src/modules/sales-ref";

export const removeCompanyFromSalesRefWorkflow = createWorkflow(
  "remove-company-from-sales-ref",
  function (input: { company_id: string; sales_ref_id: string }) {
    dismissRemoteLinkStep([
      {
        [SALES_REF_MODULE]: {
          sales_ref_id: input.sales_ref_id,
        },
        [COMPANY_MODULE]: {
          company_id: input.company_id,
        },
      },
    ]);

    return new WorkflowResponse(input);
  }
);
