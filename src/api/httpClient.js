import axios from "axios";

/**
 * Stable HTTP Client for Backend Communication
 * 
 * Design Principles:
 * - Zero mock data imports
 * - Single source of truth for API base configuration
 * - Consistent error handling and logging
 * - Backend-switch ready (just change baseURL)
 * - Request/response interceptors for auth and diagnostics
 */

const httpClient = axios.create({
  baseURL: "/",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request Interceptor: Attach Auth Token
httpClient.interceptors.request.use(
  (config) => {
    const session = JSON.parse(localStorage.getItem("session") || "null");
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    
    // Add request timestamp for performance monitoring
    config.metadata = { startTime: Date.now() };
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.info(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error("[API] Request interceptor error:", error);
    }
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Auth & Logging
httpClient.interceptors.response.use(
  (response) => {
    // Log response time in development
    if (import.meta.env.DEV && response.config?.metadata) {
      const duration = Date.now() - response.config.metadata.startTime;
      console.info(`[API] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    }
    
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();
    
    // Handle 401 Unauthorized
    if (status === 401) {
      localStorage.removeItem("session");
      // Dispatch logout event for app-wide handling
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    
    // Log errors in development
    if (import.meta.env.DEV) {
      console.error(`[API Error] ${method} ${url} → ${status}`, error.response?.data || error.message);
    }
    
    // Normalize error shape
    const normalizedError = {
      message: error.response?.data?.message || error.message || "An unexpected error occurred",
      status,
      data: error.response?.data,
      isApiError: true,
    };
    
    return Promise.reject(normalizedError);
  }
);

export default httpClient;