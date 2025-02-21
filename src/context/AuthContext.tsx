"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService, type AuthResponse } from "@/services/api";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  refreshTokenAndSetUser: () => Promise<boolean>;
  updateUser: (newUserData: User) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const refreshTokenAndSetUser = async () => {
    try {
      const response = await authService.refresh();
      if (response.accessToken && response.user) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh error:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      return false;
    }
  };

  // Initial client-side setup
  useEffect(() => {
    setIsClient(true);
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("accessToken");

      if (storedUser && token) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.email) {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up token refresh interval
  useEffect(() => {
    if (user) {
      const refreshInterval = setInterval(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          refreshTokenAndSetUser();
        }
      }, 14 * 60 * 1000); // Refresh every 14 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      console.log(response);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    } catch (error: any) {
      console.error("Login error:", error);
      throw error.response?.data?.message || error.message || "Failed to login";
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      throw (
        error.response?.data?.message || error.message || "Failed to logout"
      );
    }
  };

  const updateUser = (newUserData: User) => {
    localStorage.setItem("user", JSON.stringify(newUserData));
    setUser(newUserData);
  };

  if (!isClient || loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        refreshTokenAndSetUser,
        register: async (name, email, password) => {
          const response = await authService.register({
            name,
            email,
            password,
          });
          await login(email, password);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
