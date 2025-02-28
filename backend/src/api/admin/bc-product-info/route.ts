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
