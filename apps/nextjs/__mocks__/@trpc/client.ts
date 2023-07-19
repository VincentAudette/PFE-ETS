import { Role } from "@acme/db";

function loggerLink() {
  return () => null;
}

// Create a mock client with a query function
const createTRPCClientMock = jest.fn().mockImplementation(() => ({
  query: jest.fn().mockImplementation((path, args) => {
    // Mock the responses here based on the path and args
    if (path[0] === "auth" && path[1] === "getUser" && args === 0) {
      return Promise.resolve({ role: Role.STUDENT });
    } else if (path[0] === "auth" && path[1] == "getUser" && args === 1) {
      return Promise.resolve({ role: Role.PROMOTER });
    } else if (path[0] === "auth" && path[1] === "getUser" && args === 2) {
      return Promise.resolve({ role: Role.ADMIN });
    } else {
      return Promise.resolve({ role: "UNREGISTERED" });
    }
  }),
  links: [],
}));

module.exports = {
  ...jest.requireActual("@trpc/client"),
  createTRPCClient: createTRPCClientMock,
  loggerLink,
};
