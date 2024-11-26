"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

export function UserStatsCharts() {
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

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return null; // The skeleton will be shown by the Suspense boundary
  }

  const pieChartData = [
    { name: "Active Users", value: data.activeUsers },
    { name: "Inactive Users", value: data.inactiveUsers },
  ];

  const barChartData = Object.entries(data.usersByRole).map(
    ([role, count]) => ({
      role,
      count,
    })
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Status Distribution</CardTitle>
          <CardDescription>Active vs Inactive Users</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              activeUsers: {
                label: "Active Users",
                color: "hsl(var(--chart-2))",
              },
              inactiveUsers: {
                label: "Inactive Users",
                color: "hsl(var(--chart-5))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users by Role</CardTitle>
          <CardDescription>
            Distribution of users across different roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={Object.fromEntries(
              Object.keys(data.usersByRole).map((role, index) => [
                role,
                {
                  label: role,
                  color: `hsl(${
                    (index * 360) / Object.keys(data.usersByRole).length
                  }, 70%, 50%)`,
                },
              ])
            )}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} layout="vertical">
                <YAxis
                  dataKey="role"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis type="number" />
                <Bar dataKey="count" fill="hsl(var(--chart-3))" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
