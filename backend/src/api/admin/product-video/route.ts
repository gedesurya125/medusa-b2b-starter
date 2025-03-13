// source:  https://docs.medusajs.com/learn/fundamentals/api-routes/parse-body#configure-file-uploads
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows";
import { PRODUCT_VIDEO_MODULE } from "src/modules/product-video";
import { createProductFileWorkflow } from "src/workflows/product-file/workflows/create-product-file";
import { createProductVideoWorkflow } from "src/workflows/product-video/workflows/create-product-video";

//? Why it not use the same type as the validator, is that not possible ?
type PostAdminCreateProductVideoType = {
  //? i guess it should be the same in the validators
  videos: any;
  alts: string[] | string;
  alt: string;
};

export async function POST(
  req: MedusaRequest<PostAdminCreateProductVideoType>,
  res: MedusaResponse
) {
  const videoFiles = req?.files as Express.Multer.File[];

  if (!videoFiles?.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "No video were uploaded"
    );
  }

  const { result: uploadVideoWorkflowResult } = await uploadFilesWorkflow(
    req.scope
  ).run({
    input: {
      files: videoFiles?.map((f) => ({
        filename: f.originalname,
        mimeType: f.mimetype,
        content: f.buffer.toString("binary"),
        access: "public",
      })),
    },
  });

  // TODO: Currently
  const storedVideoResult = await Promise.all(
    uploadVideoWorkflowResult.map(async (uploadVideoResultItem, index) => {
      const hasMultipleAlts =
        Array.isArray(req.validatedBody?.alts) &&
        req.validatedBody?.alts?.length > 0;
      const { result: createProductVideoWorkflowResult } =
        await createProductVideoWorkflow(req.scope).run({
          //? req.scope container medusa container source: https://docs.medusajs.com/learn/fundamentals/medusa-container
          input: {
            video_url: uploadVideoResultItem.url,
            alt: hasMultipleAlts
              ? req.validatedBody?.alts[index]
              : req.validatedBody?.alt,
          },
        });
      return createProductVideoWorkflowResult;
    })
  );

  res.status(200).json({ files: storedVideoResult });
}

// ? Add Custom Field: Step 15: expand the GET route, to support pagination
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: productVideo, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: PRODUCT_VIDEO_MODULE,
      ...req.queryConfig, // this property hold for the pagination
    });

  res.json({
    productVideo,
    count,
    limit: take,
    offset: skip,
  });
};

// TODO: for product-video feature continue to the Step 8
