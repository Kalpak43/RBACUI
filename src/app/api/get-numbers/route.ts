import { NextRequest, NextResponse } from "next/server";
import { users } from "../mock";

interface UserStats {
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: Record<string, number>;
  totalUsers: number;
}

export async function GET(request: NextRequest) {
  // Calculate user statistics
  const stats: UserStats = {
    activeUsers: users.filter((user) => user.status === "active").length,
    inactiveUsers: users.filter((user) => user.status === "inactive").length,
    usersByRole: users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    totalUsers: users.length,
  };

  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const fields = searchParams.get("fields");

  // If fields are specified, filter the response
  if (fields) {
    const requestedFields = fields.split(",");
    console.log(requestedFields);
    const filteredStats: Partial<
      Record<keyof UserStats, number | Record<string, number>>
    > = {};

    requestedFields.forEach((field) => {
      if (field in stats) {
        filteredStats[field as keyof UserStats] =
          stats[field as keyof UserStats];
      }
    });

    console.log(filteredStats);

    return NextResponse.json(filteredStats);
  }

  console.log(stats);
  // If no fields are specified, return all stats
  return NextResponse.json(stats);
}
