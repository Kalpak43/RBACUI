"use client";

import { Cell, Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

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

export default function UserPieChart({ data }: { data: UserStats }) {
  const pieChartData = [
    { name: "Active Users", value: data.activeUsers },
    { name: "Inactive Users", value: data.inactiveUsers },
  ];

  return (
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
  );
}
