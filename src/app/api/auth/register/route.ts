import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";

export async function POST(request: NextRequest) {
  console.log("Register route hit!"); // Check if the route is being called
  try {
    const { email, password } = await request.json();
    console.log("Received data:", { email, password }); // Log received data

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide an email and password" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      { message: "User registered sucessfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in register route:", error);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );  
  }
}
