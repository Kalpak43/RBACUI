import { Suspense } from "react";
import { UserStatsCharts } from "@/components/UserStatsChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserStatsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">User Statistics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <UserStatsCharts />
        </Suspense>
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
