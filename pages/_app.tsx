import "../styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import type { AppProps } from "next/app";
import { TraduccionProvider } from "../hooks/useTranslationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TraduccionProvider>
      <Component {...pageProps} />
    </TraduccionProvider>
  );
}

export default MyApp;
