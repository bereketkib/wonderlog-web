import axios from "axios";

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "AUTHOR" | "USER"; // Make consistent with dashboard
  };
  accessToken: string;
  refreshToken?: string; // Add refresh token to type
}

const isTokenExpiringSoon = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    // Check if token will expire in the next 1 minute
    return Date.now() >= expiryTime - 60000;
  } catch {
    return true;
  }
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Add request interceptor to include access token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Check if token is expiring soon and refresh if needed
      if (isTokenExpiringSoon(token) && config.url !== "/auth/refresh") {
        try {
          const response = await authService.refresh();
          if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            config.headers.Authorization = `Bearer ${response.accessToken}`;
            return config;
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshEndpoint = originalRequest.url === "/auth/refresh";

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post<AuthResponse>("/auth/refresh");
        const { accessToken, user } = response.data;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          // Store user data in localStorage for persistence
          localStorage.setItem("user", JSON.stringify(user));
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  async logout() {
    await api.post("/auth/logout");
    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Redirect to home page using window.location
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  },

  async refresh() {
    try {
      const response = await api.post<AuthResponse>("/auth/refresh");
      // Store user data along with the token
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      console.log("accesstoken refreshed");
      return response.data;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      throw error;
    }
  },
};

export default api;
