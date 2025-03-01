// source:  https://docs.medusajs.com/learn/fundamentals/api-routes/parse-body#configure-file-uploads
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const files = req?.files as Express.Multer.File[];

  if (!files?.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "No files were uploaded"
    );
  }

  const { result } = await uploadFilesWorkflow(req.scope).run({
    input: {
      files: files?.map((f) => ({
        filename: f.originalname,
        mimeType: f.mimetype,
        content: f.buffer.toString("binary"),
        access: "public",
      })),
    },
  });

  res.status(200).json({ files: result });
}
