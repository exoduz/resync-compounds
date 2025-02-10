import React, { createContext, useState, useContext, ReactNode } from "react";
import { login as authLogin } from "../api/auth";

type AuthContextType = {
  userId: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const data = await authLogin(username, password); // Use the auth.ts function
      setToken(data.access_token);
      setUserId(data.user_id);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
