// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { rest } from "msw";
import fetch from "node-fetch";

if (!global.fetch) {
  global.fetch = fetch;
}

export const handlers = [
  rest.post("/api/trpc/:path*", (req, res, ctx) => {
    const { path } = req.params;

    switch (path) {
      case "auth.getUser":
        return res(
          ctx.json({ role: "STUDENT" }), // or mock other roles based on your test case
        );
      default:
        return res(
          ctx.status(500),
          ctx.json({ error: "You must add request handler." }),
        );
    }
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
