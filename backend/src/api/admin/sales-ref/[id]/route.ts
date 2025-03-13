import type {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  AdminGetSalesRefParamsType,
  AdminUpdateSalesRefParamsType,
} from "../validator";
import { deleteSalesRefWorkflow } from "src/workflows/sales-ref/workflows/delete-sales-ref";

// ? Get specific sales ref
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

// ? Delete single sales ref
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

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminUpdateSalesRefParamsType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id } = req.params;

  // put the update sales ref workflow here
};
