// src/mock/browser.js
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Create the Service Worker instance with all handlers
export const worker = setupWorker(...handlers);

/**
 * startMockServiceWorker()
 * Called before React app mounts.
 * Ensures MSW starts only once.
 */
export async function startMockServiceWorker() {
  if (typeof window === "undefined") return;

  // Avoid double starting in HMR
  if (window.__MSW_STARTED__) return;
  window.__MSW_STARTED__ = true;

  try {
    await worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
      onUnhandledRequest: "bypass",
    });
    console.info("[MSW] Mock service worker running");
  } catch (err) {
    console.error("[MSW] Failed to start:", err);
  }
}
