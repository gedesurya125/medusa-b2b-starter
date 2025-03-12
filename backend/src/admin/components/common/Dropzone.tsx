import { Button, Text } from "@medusajs/ui";
import React, { ChangeEvent } from "react";
import { Trash } from "@medusajs/icons";

export type DropzoneFileStateType = File | null;

interface DropzoneProps {
  file: DropzoneFileStateType;
  setFile: React.Dispatch<React.SetStateAction<DropzoneFileStateType>>;
}

export const Dropzone = ({ file, setFile }: DropzoneProps) => {
  //? source: https://medium.com/@aren.talb00/creating-a-custom-file-input-using-react-and-useref-233f5d4abfc9

  console.log("this is the file value");

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setFile(file);
    }
  };

  const updateFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  console.log("this is the file", file);

  return (
    <label
      htmlFor="dropzone-file"
      className="bg-ui-bg-component border-ui-border-strong transition-fg group flex w-full flex-col items-center gap-y-2 rounded-lg border border-dashed py-8 px-12 hover:border-ui-border-interactive focus:border-ui-border-interactive focus:shadow-borders-focus outline-none focus:border-solid relative cursor-pointer"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      {file ? (
        <div className="flex items-center w-full">
          <div className="w-14 h-14 bg-gray-900 flex justify-center items-center rounded">
            <Text>{file.type.split("/")[1]}</Text>
          </div>
          <div className="ml-4 flex-1">
            <Text>name: {file.name}</Text>
            <Text>type: {file.type}</Text>
            <Text>size: {file.size}B</Text>
            <Button
              size="small"
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
              }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ) : (
        <DropInstruction />
      )}
      <input
        id="dropzone-file"
        type="file"
        onChange={updateFile}
        className="hidden"
      />
    </label>
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
