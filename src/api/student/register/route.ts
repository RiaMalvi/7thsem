import { Student } from "@/db/schema/student";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbMiddleware } from "@/middleware/db";

async function handler(request: NextRequest): Promise<NextResponse> {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  const {
    studentId,
    name,
    batch,
    semester,
    branch,
    email,
    phone,
    address,
    password,
  } = await request.json();
  if (
    !studentId ||
    !name ||
    !batch ||
    !semester ||
    !branch ||
    !email ||
    !password
  ) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      studentId,
      name,
      batch,
      semester,
      branch,
      email,
      phone,
      address,
      password: hashedPassword,
    });
    await student.save();
    const token = jwt.sign({ studentId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return NextResponse.json(
      { data: { token }, message: "Registration successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const POST = dbMiddleware(handler);
