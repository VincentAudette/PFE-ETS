// __mocks__/mockControl.ts
export let mockAuthState = {
  isSignedIn: true,
  userId: "mock-user-id",
};

export const setMockAuthState = (newState: any) => {
  mockAuthState = newState;
};
