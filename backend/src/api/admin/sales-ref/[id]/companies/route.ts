import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import {
  AdminAddCompanyToSalesRefType,
  AdminRemoveCompanyFromSalesRefType,
} from "../../validator";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { addCompanyToSalesRefWorkflow } from "src/workflows/sales-ref/workflows/add-company-to-sales-ref";
import { removeCompanyFromSalesRefWorkflow } from "src/workflows/sales-ref/workflows/remove-company-from-sales-ref";

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminAddCompanyToSalesRefType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id: sales_ref_id } = req.params;
  const { company_id } = req.validatedBody;

  await addCompanyToSalesRefWorkflow(req.scope).run({
    input: { sales_ref_id, company_id },
  });

  const {
    data: [salesRef],
  } = await query.graph(
    {
      entity: "sales_refs",
      ...req.queryConfig,
      fields: ["*", "companies.*"],
      filters: { id: [sales_ref_id] },
    },
    {
      throwIfKeyNotFound: true,
    }
  );

  res.json({ salesRef });
};

export const DELETE = async (
  req: AuthenticatedMedusaRequest<AdminRemoveCompanyFromSalesRefType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { id: sales_ref_id } = req.params;
  const { company_id } = req.validatedBody;

  console.log("this is the information", { sales_ref_id, company_id });

  await removeCompanyFromSalesRefWorkflow(req.scope).run({
    input: { company_id, sales_ref_id },
  });

  const {
    data: [salesRef],
  } = await query.graph(
    {
      entity: "sales_refs",
      ...req.queryConfig,
      fields: ["*", "companies.*"],
      filters: { id: [sales_ref_id] },
    },
    {
      throwIfKeyNotFound: true,
    }
  );

  res.json({ salesRef });
};
