import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/db/schema/student";
import { dbMiddleware } from "@/middleware/db";

async function getStudent(request: NextRequest): Promise<NextResponse> {
  try {
    const { _id } = await request.json();
    const student = await Student.findById(_id);
    return NextResponse.json(student);
  } catch (error) {
    console.error("Error getting student", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const POST = dbMiddleware(getStudent);
