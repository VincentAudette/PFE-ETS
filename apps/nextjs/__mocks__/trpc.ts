import { Role } from "@acme/db";
import { trpc as real_trpc } from "../src/utils/trpc";
import { TRPCClientError } from "@trpc/client";

// const useQueryMock = real_trpc.auth.getUser.useQuery;

export const trpc = jest.fn().mockImplementation(() => ({
  auth: {
    getUser: {
      // Pass in the clerkId to mock the role of the user 0 = student, 1 = promoter, 2 = admin
      useQuery: jest
        .fn()
        .mockImplementation((clerkId = -1, { enabled, retry, retryDelay }) => {
          if (clerkId == 0) {
            return {
              data: { role: Role.STUDENT },
              isLoading: false,
            };
          } else if (clerkId == 1) {
            return {
              data: { role: Role.PROMOTER },
              isLoading: false,
            };
          } else if (clerkId == 2) {
            return {
              data: { role: Role.ADMIN },
              isLoading: false,
            };
          }

          return {
            data: { role: "UNREGISTERED" },
            isLoading: false,
          };
        }),
    },
  },
  links: [
    // This is the ending link, the fetcher
    {
      link: jest.fn().mockImplementation(({ op, prev }) => {
        if (!prev) {
          return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
              resolve({
                type: "data",
                data: {
                  // Return mock data for the request here.
                  // It needs to match the shape of the data your actual fetcher link would return.
                  // For this case, you might return the same data you're returning in the useQuery mock.
                  // You could move that logic into a helper function to avoid duplication.
                },
              });
            }, 0);
          });
        }

        return prev;
      }),
    },
  ],
  ssr: false,
  onError: (e: any) => {
    throw new TRPCClientError(
      "No more links to execute - did you forget to add an ending link?",
      e,
    );
  },
}));

// Mock other exported types if necessary
export type RouterInputs = {
  auth: {
    getUser: {
      input: unknown;
    };
  };
};

export type RouterOutputs = {
  auth: {
    getUser: {
      output: unknown;
    };
  };
};

// jest.mock("trpc", () => ({
//   auth: {
//     getUser: {
//       useQuery: () => ({ data: { role: roles[i] }, isLoading: false }),
//     },
//   },
//   ssr: false,
// }));
