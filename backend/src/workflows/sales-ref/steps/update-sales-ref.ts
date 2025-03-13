import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ModuleUpdateSalesRef } from "../../../types";
import SalesRefService from "src/modules/sales-ref/service";
import { SALES_REF_MODULE } from "src/modules/sales-ref";

export const updateSalesRefStep = createStep(
  "update-sales-ref-step",
  async (input: ModuleUpdateSalesRef, { container }) => {
    const salesRefModule = container.resolve<SalesRefService>(SALES_REF_MODULE);

    const [previousData] = await salesRefModule.listSalesRefs({
      id: input.id,
    });

    const updateSalesRefs = await salesRefModule.updateSalesRefs(input);

    return new StepResponse(updateSalesRefs, previousData);
  },
  async (previousData: ModuleUpdateSalesRef, { container }) => {
    const salesRefModule = container.resolve<SalesRefService>(SALES_REF_MODULE);

    await salesRefModule.updateSalesRefs(previousData);
  }
);
