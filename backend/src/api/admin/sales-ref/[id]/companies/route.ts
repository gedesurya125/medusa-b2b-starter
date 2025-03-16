import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { AdminAddCompanyToSalesRefType } from "../../validator";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { addCompanyToSalesRefWorkflow } from "src/workflows/sales-ref/workflows/add-companies-to-sales-ref";

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminAddCompanyToSalesRefType>,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { id: sales_ref_id } = req.params;
  const { company_id } = req.validatedBody;

  console.log("this is the company ids on the route", company_id);

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
