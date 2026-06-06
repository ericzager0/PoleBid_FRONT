import { authStorage } from "@/api/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Al montar, checkea si hay token guardado
    (async () => {
      try {
        const token = await authStorage.getToken();
        setIsAuthenticated(!!token);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (token: string) => {
    await authStorage.setToken(token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await authStorage.removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
