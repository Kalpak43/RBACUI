"use client";

import { Navbar } from "@/components/ui/navbar";
import { AuthProvider, useAuth } from "@/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("user", user);
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <AuthProvider>
      <Navbar userRole={user?.role || ""} userName={user?.username || ""} />
      {children}
    </AuthProvider>
  );
}
