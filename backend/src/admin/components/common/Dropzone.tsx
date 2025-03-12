import { Button, Text } from "@medusajs/ui";
import React, { ChangeEvent } from "react";
import { Trash } from "@medusajs/icons";

export type DropzoneFileStateType = FileList | null;

export interface DropzoneProps {
  files: DropzoneFileStateType;
  setFiles: React.Dispatch<React.SetStateAction<DropzoneFileStateType>>;
}

export const Dropzone = ({ files, setFiles }: DropzoneProps) => {
  //? source: https://medium.com/@aren.talb00/creating-a-custom-file-input-using-react-and-useref-233f5d4abfc9

  console.log("this is the file value");

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      setFiles(files);
    }
  };

  const updateFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;
      setFiles(files);
    }
  };

  console.log("this is the file", files);

  return (
    <label
      htmlFor="dropzone-file"
      className="bg-ui-bg-component border-ui-border-strong transition-fg group flex w-full flex-col items-center gap-y-2 rounded-lg border border-dashed py-8 px-12 hover:border-ui-border-interactive focus:border-ui-border-interactive focus:shadow-borders-focus outline-none focus:border-solid relative cursor-pointer"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      {files ? (
        <>
          <FileListDisplay files={files} />
          <Button
            size="small"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.preventDefault();
              setFiles(null);
            }}
          >
            <Trash />
          </Button>
        </>
      ) : (
        <DropInstruction />
      )}
      <input
        id="dropzone-file"
        type="file"
        onChange={updateFile}
        className="hidden"
        multiple
      />
    </label>
  );
};

const FileListDisplay = ({ files }: { files: FileList }) => {
  const Components: JSX.Element[] = [];

  for (let i = 0; i < files.length; i++) {
    Components.push(<FileDisplayItem key={i} file={files[i]} />);
  }
  return Components;
};

const FileDisplayItem = ({ file }: { file: File }) => {
  return (
    <div className="flex items-center w-full [&:not(:first-of-type)]:border-t-2 [&:not(:first-of-type)]:mt-3 [&:not(:first-of-type)]:pt-5">
      <div className="w-14 h-14 bg-gray-900 flex justify-center items-center rounded">
        <Text>{file.type.split("/")[1]}</Text>
      </div>
      <div className="ml-4 flex-1">
        <Text>name: {file.name}</Text>
        <Text>type: {file.type}</Text>
        <Text>size: {file.size}B</Text>
      </div>
    </div>
  );
};

const DropInstruction = () => {
  return (
    <>
      <div className="text-ui-fg-subtle group-disabled:text-ui-fg-disabled flex items-center gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="none"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13.056 9.944v1.334c0 .982-.796 1.778-1.778 1.778H3.722a1.777 1.777 0 0 1-1.778-1.778V9.944M4.389 5.5 7.5 8.611 10.611 5.5M7.5 8.611V1.944"
          ></path>
        </svg>
        <p className="font-normal font-sans txt-medium">Upload File</p>
      </div>
      <p className="font-normal font-sans txt-compact-small text-ui-fg-muted group-disabled:text-ui-fg-disabled">
        Drag and drop pdf file here or click to upload.
      </p>
    </>
  );
};
