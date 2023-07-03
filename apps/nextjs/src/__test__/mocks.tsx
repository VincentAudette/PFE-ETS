// mocks.tsx
import { useRouter } from "next/router";
import fetch from "node-fetch";
global.fetch = fetch as any;

jest.mock("@uploadthing/react");
jest.mock("react-lottie");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@clerk/nextjs");

jest.mock("@trpc/client");

jest.mock("../context/PFEAuthContext", () => ({
  usePFEAuth: () => ({
    userData: {},
    authProfile: null,
  }),
}));

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");

  const mockQueryClient = {
    // Add here the methods you want to mock.
    // For instance, if you're using `useQuery`, you could add:
    useQuery: () => ({
      data: {}, // Replace with the data you want to use for your tests.
      // Add any other properties that you're accessing from the result of useQuery.
    }),
  };

  return {
    ...originalModule,
    QueryClient: jest.fn(() => mockQueryClient),
  };
});
