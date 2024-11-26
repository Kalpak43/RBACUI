import { NextResponse } from "next/server";
import { users } from "../mock";

export async function PUT(request: Request) {
  const { id, updatedData } = await request.json();

  try {
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      // Add new user if not found
      const newUser = { ...updatedData, status: "active" };
      newUser.id = users.length + 1;
      users.push(newUser);
    } else {
      // Update existing user
      users[userIndex] = { ...users[userIndex], ...updatedData };
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
