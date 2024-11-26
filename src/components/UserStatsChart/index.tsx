"use client";

import { useState, useEffect } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Bar,
  BarChart,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
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
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(1);
  }, []);

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
        <CardContent className="flex items-center justify-center">
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
            className="h-[150px] md:h-[300px]"
          >
            <PieChart height={100}>
              <Pie
                key={key}
                data={pieChartData}
                cx="50%"
                cy="50%"
                startAngle={0}
                endAngle={360}
                innerRadius={40}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
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
            className="h-[150px] md:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} layout="vertical">
                <ChartTooltip content={<ChartTooltipContent />} />
                <YAxis
                  dataKey="role"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis type="number" />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--chart-3))"
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {barChartData.map((entry, index) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
