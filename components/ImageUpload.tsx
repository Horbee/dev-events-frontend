import axios from "axios";
import { FormEventHandler, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { Box, Button, CloseButton, Icon, IconButton, Image, VStack } from "@chakra-ui/react";

import { API_URL } from "../config";
import { DropArea } from "./DropArea";

interface ImageUploadProps {
  eventId: number;
  imageUploaded: () => void;
  token: string;
}

export const ImageUpload = ({
  eventId,
  imageUploaded,
  token
}: ImageUploadProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("files", image);
      formData.append("ref", "events");
      formData.append("refId", eventId.toString());
      formData.append("field", "image");

      await axios.post(`${API_URL}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      imageUploaded();
    }
  };

  console.log(image);

  return (
    <form onSubmit={handleSubmit}>
      <VStack align="center">
        {image ? (
          <Box position="relative">
            <Icon
              fontSize="xl"
              aria-label="Remove"
              position="absolute"
              top="3px"
              right="3px"
              color="white"
              cursor="pointer"
              onClick={() => setImage(null)}
              as={FaTrashAlt}
            />
            <Image src={URL.createObjectURL(image)} width={170} height={100} />
          </Box>
        ) : (
          <DropArea setImage={setImage} />
        )}
        <Button colorScheme="red" type="submit" w="100%">
          Upload
        </Button>
      </VStack>
    </form>
  );
};
