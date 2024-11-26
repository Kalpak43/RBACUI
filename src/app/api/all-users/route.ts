import { NextResponse } from "next/server";
import { users } from "../mock";

export async function POST(request: Request) {
  const { email, role } = await request.json();

  try {
    if (role === "user") {
      return NextResponse.json(
        { error: "Method not Allowed" },
        { status: 404 }
      );
    }

    const user = users.find((u) => u.email === email && u.role === role);

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json({
      success: true,
      users: [...users],
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  }
}
