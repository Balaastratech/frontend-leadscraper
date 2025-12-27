// src/mock/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// MSW server for node/jest/vitest
export const server = setupServer(...handlers);

export function testServerLifecycle() {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
