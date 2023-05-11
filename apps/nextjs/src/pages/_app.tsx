// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { frFR } from "@clerk/localizations";
import { PFEAuthProvider } from "../context/PFEAuthContext";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider localization={frFR} {...pageProps}>
      <PFEAuthProvider>
        <Component {...pageProps} />
      </PFEAuthProvider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
