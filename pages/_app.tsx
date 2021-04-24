import { ConfirmationDialogProvider } from "@/components/confirmation-dialog/ConfirmationDialogProvider";
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ConfirmationDialogProvider>
        <Component {...pageProps} />
      </ConfirmationDialogProvider>
    </ChakraProvider>
  );
}
