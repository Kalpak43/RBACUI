"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/login";
import { useAuth } from "@/hooks/AuthProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { login } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-4 text-center">
      <h1 className="text-4xl">Welcome to Role Based Access Control UI</h1>
      <Button variant="outline">
        <Link href={"/login"}>Click Here to Login</Link>
      </Button>
    </main>
  );
}
