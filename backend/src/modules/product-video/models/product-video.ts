// ? Add Custom Field: Step 1: Creating custom field in medusa
import { model } from "@medusajs/framework/utils";

// ? This create a new table using DML language and the object below is defined the model columns, relations, and indexes
export const ProductVideo = model.define(
  "product_video", //? name of the data model, we should use the snake case naming here source https://docs.medusajs.com/learn/customization/custom-features/module
  {
    //? this object is the data model's schema
    id: model.id().primaryKey(),
    video_url: model.text().unique(), //? the column name should in snake case as well, otherwise it could product error due ot camel case will be converted into lower case
    alt: model.text(),
  }
);
