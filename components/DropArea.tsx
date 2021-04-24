import { ChangeEventHandler, SetStateAction, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

import { Button, Icon, Input, Text, VStack } from "@chakra-ui/react";

interface DropAreaProps {
  setImage: (value: SetStateAction<File | null>) => void;
}

export const DropArea = ({ setImage }: DropAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImage(e.target.files?.[0] ?? null);
  };

  return (
    <VStack
      color="blue.400"
      textAlign="center"
      border="1px dashed black"
      spacing={4}
      align="center"
      p="2"
      w="100%"
      {...getRootProps()}
    >
      <Icon as={FaCloudUploadAlt} fontSize="4xl" />
      {isDragActive ? (
        <Text>Drop the files here ...</Text>
      ) : (
        <Text>Drag and Drop an Image here to upload</Text>
      )}
      <Input
        type="file"
        placeholder="Select Image"
        onChange={handleFileChange}
        d="none"
        ref={inputRef}
        {...getInputProps}
      />
      <Button
        colorScheme="blackAlpha"
        onClick={() => inputRef.current?.click()}
      >
        Or Click to Select
      </Button>
    </VStack>
  );
};
