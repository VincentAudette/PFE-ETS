import { render } from "@testing-library/react";
import React from "react";
import { PFEAuthContext, PFEAuthContextType } from "../context/PFEAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { ProjectProvider } from "../context/ProjectContext";
import { trpc } from "../utils/trpc";
import { ToastContainer } from "react-toastify";

type MockAppProps = {
  Component: React.ComponentType;
  pageProps: any;
  authValues: PFEAuthContextType;
};

const MockApp: React.FC<MockAppProps> = ({
  Component,
  pageProps: { ...pageProps },
  authValues,
}: {
  Component: React.ComponentType;
  pageProps: any;
  authValues: PFEAuthContextType;
}) => {
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

const TRPCWrappedMockApp = trpc.withTRPC(MockApp);

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
        // @ts-ignore
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
