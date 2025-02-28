// ? Add Custom Field: Step 8: create the api route source: https://docs.medusajs.com/learn/customization/custom-features/api-route#1-create-the-api-route

import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createBrandWorkflow } from "../../../workflows/brand/workflows/create-brand";
import { z } from "zod";

import { PostAdminCreateBrand } from "./validators";

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  // the req.scope === Medusa Container, it holds framework tools and custom and core module services
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ brand: result });
};

// ? Add Custom Field: Step 15: expand the GET route, to support pagination
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: brands, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "brand",
      ...req.queryConfig, // this property hold for the pagination
    });

  res.json({
    brands,
    count,
    limit: take,
    offset: skip,
  });
};
