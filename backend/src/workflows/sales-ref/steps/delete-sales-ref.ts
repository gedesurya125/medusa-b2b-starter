import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import SalesRefService from "src/modules/sales-ref/service";
import { SALES_REF_MODULE } from "src/modules/sales-ref";

export const deleteSalesRefStep = createStep(
  "delete-delete-sales-ref-step",
  async (ids: string[], { container }) => {
    const salesRefModule = container.resolve<SalesRefService>(SALES_REF_MODULE);

    await salesRefModule.softDeleteSalesRefs(ids);

    return new StepResponse(ids, ids);
  },
  async (salesRefIds: string[], { container }) => {
    const salesRefModule = container.resolve<SalesRefService>(SALES_REF_MODULE);

    await salesRefModule.restoreSalesRefs(salesRefIds);
  }
);
