"use client";

import { Suspense, useEffect, useState } from "react";
// import { UserStatsCharts } from "@/components/UserStatsChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const UserPieChart = dynamic(() =>
  import("@/components/UserStatsChart/UserPieChart").then((mod) => mod.default)
);

const UserBarChart = dynamic(() =>
  import("@/components/UserStatsChart/UserBarChart").then((mod) => mod.default)
);

interface UserStats {
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: Record<string, number>;
  totalUsers: number;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function UserStatsPage() {
  const [data, setData] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/get-numbers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user stats");
        }
        return response.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">User Statistics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data ? (
          <>
            <UserPieChart data={data} />
            <UserBarChart data={data} />
          </>
        ) : (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        )}
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[200px]" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
}
