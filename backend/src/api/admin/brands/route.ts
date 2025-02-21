// ? Add Custom Field: Step8: create the api route source: https://docs.medusajs.com/learn/customization/custom-features/api-route#1-create-the-api-route

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

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: brands } = await query.graph({
    entity: "brand",
    fields: ["*", "products.*"], // the first item is the property we want to retrieve,and the second one is a relation or linked model's name. the suffix .* means retrieve all properties
  });

  res.json({ brands });
};
