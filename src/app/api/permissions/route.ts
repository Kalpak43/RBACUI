import { NextResponse } from "next/server";
import { users, permissions, roleBasedPermissions } from "../mock";

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({ users, permissions, roleBasedPermissions });
}
