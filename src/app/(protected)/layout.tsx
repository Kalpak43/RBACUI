"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Navbar } from "@/components/ui/navbar";
import { useAuth } from "@/hooks/AuthProvider";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Navbar userRole={user?.role || ""} userName={user?.username || ""} />
      {children}
    </ProtectedRoute>
  );
}
