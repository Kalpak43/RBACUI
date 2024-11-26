import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl text-red-900 font-bold text-center">
        403 Forbidden
      </h1>
      <p className="text-lg text-center mt-4">
        You are not authorized to access this page.
      </p>
      <Button className="mt-4">
        <Link href="/">Go back</Link>
      </Button>
    </main>
  );
}
