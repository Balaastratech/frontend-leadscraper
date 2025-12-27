import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import store from "./store/store";
import GlobalErrorBoundary from "./GlobalErrorBoundary";

import "./design/tokens.css";
import "./index.css";
import { ThemeProvider } from "./PublicPages/theme/ThemeProvider";

window.storeRef = store;

// Create one client for entire app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false, // recommended for SaaS dashboards
      staleTime: 30_000,
    },
  },
});

// MSW mock backend in dev
async function bootstrap() {
  if (import.meta.env.MODE !== "production") {
    const { startMockServiceWorker } = await import("./mock/browser");
    await startMockServiceWorker();
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <GlobalErrorBoundary>
              <App />
            </GlobalErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>

        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  );
}

bootstrap();
