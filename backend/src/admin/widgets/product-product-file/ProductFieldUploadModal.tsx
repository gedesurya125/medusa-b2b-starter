import { Button, FocusModal, Heading, Input, Label, Text } from "@medusajs/ui";
import {
  Dropzone,
  DropzoneFileStateType,
  DropzoneProps,
} from "../../../../src/admin/components/common/Dropzone";
import React from "react";
import { AdminProduct } from "@medusajs/framework/types";
import { useUpdateProductFiles } from "./useProductWithProductFile";

interface ProductFileUploadModalProps
  extends React.ComponentProps<typeof FocusModal> {
  product: AdminProduct;
}

export function ProductFileUploadModal({
  product,
  ...props
}: ProductFileUploadModalProps) {
  const updateProductMutation = useUpdateProductFiles();
  const [files, setFiles] = React.useState<DropzoneFileStateType>(null);

  return (
    <FocusModal {...props}>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button
            onClick={() => {
              if (files) {
                updateProductMutation.mutate({
                  product,
                  files,
                  alts: ["new file"],
                });
              }
            }}
          >
            Save
          </Button>
        </FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <Content files={files} setFiles={setFiles} />
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}

const Content = ({ files, setFiles }: DropzoneProps) => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <Heading>Upload Product Documentation</Heading>
        <Text className="text-ui-fg-subtle">The product documentation</Text>
      </div>
      <div className="flex flex-col gap-y-2">
        <Dropzone files={files} setFiles={setFiles} />
      </div>
    </div>
  );
};
