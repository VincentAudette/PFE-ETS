export const trpc = jest.fn().mockImplementation(() => ({
    auth: {
      getUser: {
        useQuery: jest.fn().mockImplementation((clerkId, { enabled, retry, retryDelay }) => ({
          data: { role: 'UNREGISTERED' },
          isLoading: false,
        })),
      },
    },
    ssr: false,
  }));
  
  
  
  
  // Mock other exported types if necessary
  export type RouterInputs = {
    auth: {
      getUser: {
        input: unknown,
      },
    },
  };
  
  export type RouterOutputs = {
    auth: {
      getUser: {
        output: unknown,
      },
    },
  };
  