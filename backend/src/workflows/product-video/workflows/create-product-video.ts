import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";

import { PRODUCT_VIDEO_MODULE } from "src/modules/product-video";
import ProductVideoService from "src/modules/product-video/service";

export type CreateProductVideoStepInput = {
  video_url: string;
  alt: string;
};

export const createProductVideoStep = createStep(
  "create-product-video-step",
  async (input: CreateProductVideoStepInput, { container }) => {
    const productVideoModuleService: ProductVideoService =
      container.resolve(PRODUCT_VIDEO_MODULE);

    // @ts-ignore //? typescript bug, the  function name should be createProductVideos not createProductVideoes
    const productVideo = await productVideoModuleService.createProductVideos(
      input
    );

    return new StepResponse(productVideo, productVideo.id); //? the second params is passed to first params of Compensation function
  },
  // Compensation function
  async (id: string, { container }) => {
    const productVideoModuleService: ProductVideoService =
      container.resolve(PRODUCT_VIDEO_MODULE);
    // @ts-ignore //? typescript bug, the  function name should be deleteProductVideos not deleteProductVideoes
    await productVideoModuleService.deleteProductVideos(id);
  }
);

type CreateProductVideoWorkflowInput = {
  video_url: string;
  alt: string;
};

export const createProductVideoWorkflow = createWorkflow(
  "create-product-video",
  (input: CreateProductVideoWorkflowInput) => {
    const productVideo = createProductVideoStep(input);

    return new WorkflowResponse(productVideo);
  }
);
