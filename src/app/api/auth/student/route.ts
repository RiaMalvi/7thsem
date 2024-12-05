import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/db/schema/student";
import { dbMiddleware } from "@/middleware/db";

async function login(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, studentId } = await request.json();
    const student = await Student.findOne({ email, studentId });
    if (!student) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isMatch = student.password === password;
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
    const token = jwt.sign(
      { _id: student._id, studentId: student.studentId, name: student.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error logging in", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const POST = dbMiddleware(login);
