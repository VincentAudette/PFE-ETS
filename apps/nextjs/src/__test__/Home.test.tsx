// Home.test.tsx
import { act, screen, waitFor } from "@testing-library/react";
import { render } from "./test.utils";
import "./mocks"; // assuming your mocks are in the same directory
import Home from "../pages";
import { setMockAuthState } from "../../__mocks__/mockControl";
import { Role } from "@acme/db";
import { PFEAuthContextType, usePFEAuth } from "../context/PFEAuthContext";
import { pfeAuthMockValues } from "./mocks";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
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

      const mockValues: PFEAuthContextType = pfeAuthMockValues(
        roles[i] as Role,
      );

      render(<Home />, {}, mockValues);

      // expect(useRouter).toHaveBeenCalledTimes(2);
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith(redirectPages[i]);

      // Clear all mocks after each iteration
      jest.resetAllMocks();
    }
  });

  it("renders loading when the user is signed in and data is loading", () => {
    setMockAuthState({
      isSignedIn: true,
      userId: "mock-user-id",
      isLoaded: true,
      sessionId: "mock-session-id",
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      signOut: async () => {
        return new Promise((resolve) => resolve("mock-sign-out"));
      },
      getToken: async () => {
        return new Promise((resolve) => resolve("mock-token"));
      },
    });
    const mockValues: PFEAuthContextType = pfeAuthMockValues(null);
    render(<Home />, {}, mockValues);

    expect(screen.getByText("Chargement...")).toBeInTheDocument();
    // expect(screen.getByText("Lottie Animation")).toBeInTheDocument();
  });

  it("renders welcome section when the user is not signed in", () => {
    setMockAuthState({
      isSignedIn: false,
      userId: null,
      isLoaded: true,
      sessionId: null,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      signOut: async () => {
        return new Promise((resolve) => resolve("mock-sign-out"));
      },
      getToken: async () => "mock-token",
    });

    const mockValues: PFEAuthContextType = pfeAuthMockValues(null);
    render(<Home />, {}, mockValues);

    const title = screen.getByText(/Plateforme PFE dédiée aux/i);
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pour accéder à l'application, vous devez vous connecter avec votre compte ou en créer un./i,
      ),
    ).toBeInTheDocument();
  });
});
