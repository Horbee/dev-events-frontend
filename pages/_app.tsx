import { checkAuthState } from "features/user/userSlice";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "store/store";

import {
    ConfirmationDialogProvider
} from "@/components/confirmation-dialog/ConfirmationDialogProvider";
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";
export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(checkAuthState());
  }, []);

  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <ConfirmationDialogProvider>
          <Component {...pageProps} />
        </ConfirmationDialogProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
}
