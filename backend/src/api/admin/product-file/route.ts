// source:  https://docs.medusajs.com/learn/fundamentals/api-routes/parse-body#configure-file-uploads
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows";
import { createProductFileWorkflow } from "src/workflows/product-file/workflows/create-product-file";

//? Why it not use the same type as the validator, is that not possible ?
type PostAdminCreateProductFileType = {
  //? i guess it should be the same in the validators
  files: any;
  alt: string;
};

export async function POST(
  req: MedusaRequest<PostAdminCreateProductFileType>,
  res: MedusaResponse
) {
  const files = req?.files as Express.Multer.File[];

  if (!files?.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "No files were uploaded"
    );
  }

  const { result: uploadFilesWorkflowResult } = await uploadFilesWorkflow(
    req.scope
  ).run({
    input: {
      files: files?.map((f) => ({
        filename: f.originalname,
        mimeType: f.mimetype,
        content: f.buffer.toString("binary"),
        access: "public",
      })),
    },
  });

  const storedFileResult = await Promise.all(
    uploadFilesWorkflowResult.map(async (uploadFileResultItem) => {
      const { result: createProductFileWorkflowResult } =
        await createProductFileWorkflow(req.scope).run({
          //? req.scope container medusa container source: https://docs.medusajs.com/learn/fundamentals/medusa-container
          input: {
            file_url: uploadFileResultItem.url,
            alt: req.validatedBody.alt,
          },
        });
      return createProductFileWorkflowResult;
    })
  );

  res.status(200).json({ files: storedFileResult });
}

// ? Add Custom Field: Step 15: expand the GET route, to support pagination
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: productFile, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "product_file",
      ...req.queryConfig, // this property hold for the pagination
    });

  res.json({
    productFile,
    count,
    limit: take,
    offset: skip,
  });
};
