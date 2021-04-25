import { createStandaloneToast } from "@chakra-ui/toast";

const toast = createStandaloneToast();

export const createErrorToast = (message: string, title: string = "Error") => {
  toast({
    title,
    description: message,
    status: "error",
    duration: 9000,
    isClosable: true
  });
};
