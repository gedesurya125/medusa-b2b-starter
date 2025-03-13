import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { AdminGetSalesRefParamsType } from "../validator";

export const GET = async (
  req: MedusaRequest<AdminGetSalesRefParamsType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  const {
    data: [salesRef],
  } = await query.graph(
    {
      entity: "sales_ref",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ salesRef });
};
