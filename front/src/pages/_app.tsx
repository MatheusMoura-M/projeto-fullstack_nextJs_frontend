// import custonTheme from "@/styles/theme";
import { AuthProvider } from "@/context/authContext";
import custonTheme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={custonTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
