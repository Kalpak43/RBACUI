"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/login";
import { useAuth } from "@/hooks/AuthProvider";

export default function Home() {
  const { login } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      
    </main>
  );
}
