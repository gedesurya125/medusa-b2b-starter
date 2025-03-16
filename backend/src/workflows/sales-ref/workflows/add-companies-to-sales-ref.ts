import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";

import { SALES_REF_MODULE } from "src/modules/sales-ref";
import { COMPANY_MODULE } from "src/modules/company";
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows";

export const addCompanyToSalesRefWorkflow = createWorkflow(
  "add-company-to-sales-ref",
  (input: { company_id: string; sales_ref_id: string }) => {
    createRemoteLinkStep([
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
