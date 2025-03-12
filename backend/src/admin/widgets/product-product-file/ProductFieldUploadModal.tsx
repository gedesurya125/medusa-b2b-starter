import { Button, FocusModal, Heading, Input, Label, Text } from "@medusajs/ui";
import {
  Dropzone,
  DropzoneFileStateType,
} from "../../../../src/admin/components/common/Dropzone";
import React from "react";

interface ProductFileUploadModalProps
  extends React.ComponentProps<typeof FocusModal> {
  handleSave: () => void;
}

export function ProductFileUploadModal({
  ...props
}: ProductFileUploadModalProps) {
  return (
    <FocusModal {...props}>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button>Save</Button>
        </FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <Content />
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}

const Content = () => {
  const [file, setFile] = React.useState<DropzoneFileStateType>(null);

  return (
    <div className="flex w-full max-w-lg flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <Heading>Upload Product Documentation</Heading>
        <Text className="text-ui-fg-subtle">The product documentation</Text>
      </div>
      <div className="flex flex-col gap-y-2">
        <Dropzone file={file} setFile={setFile} />
      </div>
    </div>
  );
};
