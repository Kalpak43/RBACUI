"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function UserBarChart({ data }: { data: UserStats }) {
  const barChartData = Object.entries(data.usersByRole).map(
    ([role, count]) => ({
      role,
      count,
    })
  );

  return (
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
  );
}
