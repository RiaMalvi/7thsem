import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Student } from "@/db/schema/student";
import { dbMiddleware } from "@/middleware/db";

async function verifyStudent(request: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await request.json();
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      _id: string;
      studentId: string;
      name: string;
    };
    const id = decoded._id;
    const student = await Student.findById(id);
    console.log(student);
    return NextResponse.json(student);
  } catch (error) {
    console.error("Error getting student", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const POST = dbMiddleware(verifyStudent);
