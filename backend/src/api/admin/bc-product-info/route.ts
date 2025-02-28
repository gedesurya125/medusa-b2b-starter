import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createBcProductInfoWorkflow } from "src/workflows/bcProductInfo/workflows/create-bcProductInfo";

type PostAdminCreateBcProductInfoType = {
  bcProductId: string;
};

export const POST = async (
  req: MedusaRequest<PostAdminCreateBcProductInfoType>,
  res: MedusaResponse
) => {
  const { result } = await createBcProductInfoWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ bcProductInfo: result });
};

// ? Add Custom Field: Step 15: expand the GET route, to support pagination
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: bcProductInfo, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "bc_product_info",
      ...req.queryConfig, // this property hold for the pagination
    });

  res.json({
    bcProductInfo,
    count,
    limit: take,
    offset: skip,
  });
};
