import { render } from "@testing-library/react";
import React from "react";
import { PFEAuthContext } from "../context/PFEAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { ProjectProvider } from "../context/ProjectContext";
import { trpc } from "../utils/trpc";
import { ToastContainer } from "react-toastify";

const MockApp: any = ({ Component, pageProps, authValues }: any) => {
  return (
    <ClerkProvider localization={frFR} {...pageProps}>
      <ToastContainer />
      <PFEAuthContext.Provider value={authValues}>
        <ProjectProvider>
          <Component {...pageProps} />
        </ProjectProvider>
      </PFEAuthContext.Provider>
    </ClerkProvider>
  );
};

const TRPCWrappedMockApp: any = trpc.withTRPC(MockApp);

// Then in your test file
const customRender = (
  ui: React.ReactElement,
  options = {},
  authValues = {},
) => {
  const mockQueryClient = new QueryClient();
  return render(
    <QueryClientProvider client={mockQueryClient}>
      <TRPCWrappedMockApp
        Component={() => ui}
        pageProps={{}}
        authValues={authValues}
      />
    </QueryClientProvider>,
    options,
  );
};

export * from "@testing-library/react";

// override the built-in render with our own
export { customRender as render };
