import { authStorage } from "@/api/auth";
import { userService } from "@/api/services/users";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  categoria: string;
  numeropais: number;
  documento: string;
  direccion: string;
  isSeller: boolean;
  paymentMethods: {
    cards: [
      id: string,
      lastFour: string,
      expMonth: string,
      expYear: string,
      brand: string,
      owner: string,
    ];
  };
  products: {
    identificador: number;
    fecha: string;
    disponible: string;
    descripcioncatalogo: string;
    descripcioncompleta: string;
    revisor: number;
    duenio: number;
    seguro: string | null;
    precio: number | undefined | null;
    comision: number | undefined | null;
    hora: string | undefined | null;
    fotos: {
      id: number;
      foto: string;
    };
    estado: string;
    motivo_rechazo: string;
  };
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  getMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await authStorage.getToken();
        if (token) {
          const response = await userService.me();
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch {
        // Token inválido o expirado — limpiamos todo
        await authStorage.removeToken();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (token: string) => {
    await authStorage.setToken(token);
    const response = await userService.me();
    setUser(response.data);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await authStorage.removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const getMe = async () => {
    try {
      const response = await userService.me();
      setUser(response.data);
    } catch {
      // Si falla, probablemente el token es inválido o expirado
      await authStorage.removeToken();
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, signIn, signOut, getMe }}
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
