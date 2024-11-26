import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { User, users } from "../mock"; // Adjust the import path as necessary

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const fileContent = await file.text();
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Process the CSV data and update the users
    records.forEach(
      (record: {
        username: string;
        email: string;
        password: string;
        role: string;
      }) => {
        const existingUserIndex = users.findIndex(
          (user) => user.username === record.username
        );
        if (existingUserIndex !== -1) {
          // Update existing user
          users[existingUserIndex] = {
            ...users[existingUserIndex],
            email: record.email,
            password: record.password,
            role: record.role,
          };
        } else {
          // Append new user
          const newUser: User = {
            id: users.length + 1,
            username: record.username,
            email: record.email,
            password: record.password,
            role: record.role,
            status: "active", // Default status for new users
          };
          users.push(newUser);
        }
      }
    );

    return NextResponse.json({
      success: true,
      users: [...users],
    });
  } catch (error) {
    console.error("Error processing CSV:", error);
    return NextResponse.json(
      { error: "Failed to process CSV" },
      { status: 500 }
    );
  }
}
