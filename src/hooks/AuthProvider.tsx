"use client";

import { tcWrapper } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "./use-toast";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const AuthContext = createContext<{
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  user: null,
  login: (username: string, password: string) => null,
  logout: () => null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error);
        }

        if (data.user.status === "inactive") {
          throw new Error("User is inactive");
        }

        setUser(data.user);
        toast({
          title: "Logged in successfully",
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/dashboard");
      } catch (e: any) {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
        return;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    router.replace("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
