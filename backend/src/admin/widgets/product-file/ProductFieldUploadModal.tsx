import { Button, FocusModal, Heading, Text } from "@medusajs/ui";
import {
  Dropzone,
  DropzoneFileStateType,
  DropzoneProps,
} from "../../components/common/Dropzone";
import React from "react";
import { useUpdateProductFiles } from "./useProductFiles";
import { AdminProductWithProductFiles } from "./types";

interface ProductFileUploadModalProps
  extends React.ComponentProps<typeof FocusModal> {
  product: AdminProductWithProductFiles;
  accept: string;
}

export function ProductFileUploadModal({
  product,
  accept,
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
                  alts: [],
                });
              }
            }}
          >
            Save
          </Button>
        </FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <Content files={files} setFiles={setFiles} accept={accept} />
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}

const Content = ({ files, setFiles, accept }: DropzoneProps) => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <Heading>Upload Product Documentation</Heading>
        <Text className="text-ui-fg-subtle">The product documentation</Text>
      </div>
      <div className="flex flex-col gap-y-2">
        <Dropzone files={files} setFiles={setFiles} accept={accept} />
      </div>
    </div>
  );
};
