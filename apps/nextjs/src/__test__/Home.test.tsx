// Home.test.tsx
import { act, screen, waitFor } from "@testing-library/react";
import { render } from "./test.utils";
import "./mocks"; // assuming your mocks are in the same directory
import Home from "../pages";
import { Role } from "@acme/db";
import { PFEAuthContextType, usePFEAuth } from "../context/PFEAuthContext";
import { pfeAuthMockValues } from "./mocks";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Home", () => {
  it("renders the home page", () => {
    render(<Home />);
    expect(
      screen.getByText(
        "Projet de fin d'études à l'École de Technologie Supérieure",
      ),
    ).toBeInTheDocument();
  });

  it("redirects to the correct page based on the role", async () => {
    const roles = ["UNREGISTERED", "STUDENT", "PROMOTER", "ADMIN", "DEVELOPER"];
    const redirectPages = [
      "/register",
      "/student",
      "/promoter",
      "/admin",
      "/developer",
    ];

    for (let i = 0; i < roles.length; i++) {
      // Mock implementation of useRouter
      const mockPush = jest.fn();
      const useRouter = jest.spyOn(require("next/router"), "useRouter");
      useRouter.mockImplementation(() => ({
        route: "/",
        pathname: "",
        query: "",
        asPath: "",
        push: mockPush,
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }));

      jest.mock("@clerk/nextjs", () => ({
        useAuth: () => ({ isSignedIn: true, userId: "mockedUserId" }),
      }));

      jest.mock("trpc", () => ({
        auth: {
          getUser: {
            useQuery: () => ({ data: { role: roles[i] }, isLoading: false }),
          },
        },
        ssr: false,
      }));

      const mockValues: PFEAuthContextType = pfeAuthMockValues(
        roles[i] as Role,
      );

      render(<Home />, {}, mockValues);

      await waitFor(async () => {
        // expect(useRouter).toHaveBeenCalledTimes(2);
        expect(mockPush).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith(redirectPages[i]);
      });

      // Clear all mocks after each iteration
      jest.resetAllMocks();
    }
  });
});
