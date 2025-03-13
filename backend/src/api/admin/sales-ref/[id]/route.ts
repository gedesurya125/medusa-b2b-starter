import type {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { AdminGetSalesRefParamsType } from "../validator";
import { deleteSalesRefWorkflow } from "src/workflows/sales-ref/workflows/delete-sales-ref";
import { object } from "prop-types";

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

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params;

  const { result } = await deleteSalesRefWorkflow.run({
    input: {
      id,
    },
  });

  res.status(200).json({
    id,
    object: "sales_ref",
    deleted: true,
    result,
  });
};
