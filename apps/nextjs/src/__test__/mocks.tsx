// mocks.tsx
import { useRouter } from "next/router";

jest.mock("@uploadthing/react");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@clerk/clerk-react", () => ({
  useAuth: () => ({
    isSignedIn: true,
    userId: "mock-user-id",
  }),
}));

jest.mock("../utils/trpc", () => ({
  auth: {
    getUser: {
      useQuery: () => ({
        data: { role: "UNREGISTERED" },
        isLoading: false,
      }),
    },
  },
}));

jest.mock("../context/PFEAuthContext", () => ({
  usePFEAuth: () => ({
    userData: {},
    authProfile: null,
  }),
}));
