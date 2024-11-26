"use client";

import { useAuth } from "@/hooks/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const accessRules: Record<string, string[]> = {
  "/dashboard": ["user", "editor", "admin"],
  "/dashboard/users": ["editor", "admin"],
  "/dashboard/permissions": ["admin"],
};

interface LayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const pathname = usePathname(); // Current route
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.replace("/login");
      return;
    }

    // Check role-based access
    const allowedRoles = accessRules[pathname] || [];
    if (!allowedRoles.includes(user.role)) {
      router.replace("/403"); // Redirect to "403 Forbidden" if not authorized
    }
  }, [user, pathname, router]);

  // Show a loader or fallback while checking access
  if (!user || !(accessRules[pathname] || []).includes(user.role)) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
