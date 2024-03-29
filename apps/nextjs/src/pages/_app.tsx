// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { frFR } from "@clerk/localizations";
import { PFEAuthProvider } from "../context/PFEAuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectProvider } from "../context/ProjectContext";
import { Analytics } from "@vercel/analytics/react";
import { ProjectStateProvider } from "../context/ProjectStateContext";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider localization={frFR} {...pageProps}>
      <ToastContainer />
      <PFEAuthProvider>
        <ProjectProvider>
          <ProjectStateProvider>
            <div className="">
              <Component {...pageProps} />
              <Analytics />
            </div>
          </ProjectStateProvider>
        </ProjectProvider>
      </PFEAuthProvider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
