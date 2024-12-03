import { NextRequest, NextResponse } from "next/server";
import { dbMiddleware } from "@/middleware/db";
import bcrypt from "bcrypt";
import { Student } from "@/db/schema/student";
import jwt from "jsonwebtoken";

async function handler(request: NextRequest): Promise<NextResponse> {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  const { studentId, password } = await request.json();
  if (!studentId || !password) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = jwt.sign({ studentId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return NextResponse.json(
      { data: { token }, message: "Login successful" },
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
