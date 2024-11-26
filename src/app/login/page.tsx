"use client";

import Login from "@/components/login";
import { useAuth } from "@/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginPage() {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Login />
    </main>
  );
}
