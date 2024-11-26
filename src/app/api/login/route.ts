import { NextResponse } from "next/server";
import { User, users } from "../mock";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    console.log(email, password);
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  }
}
