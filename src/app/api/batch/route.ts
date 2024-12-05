import { NextRequest, NextResponse } from "next/server";
import { Batch } from "@/db/schema/batch";
import { Semester } from "@/db/schema/semester";
import { Student } from "@/db/schema/student";
import { dbMiddleware } from "@/middleware/db";

async function getBatches(): Promise<NextResponse> {
  try {
    //return semester and program details
    const batches = await Batch.find()
      .populate("semester")
      .populate("students");
    return NextResponse.json(batches);
  } catch (error) {
    console.error("Error getting batches", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function postBatch(request: NextRequest): Promise<NextResponse> {
  try {
    const { students, program } = await request.json();
    console.log(students, program);
    const year = new Date().getFullYear();
    const semester = await Semester.findOne({ program, semester: 1 });
    if (!semester) {
      return NextResponse.json(
        { error: "Semester not found" },
        { status: 404 }
      );
    }
    const studentIds = [];
    for (const studentData of students) {
      let student = await Student.findOne({ studentId: studentData.studentId });
      if (!student) {
        student = new Student({
          ...studentData,
          semester: semester._id,
          password: "password",
        });
        await student.save();
      }
      studentIds.push(student._id);
    }

    const batch = new Batch({
      program,
      year,
      semester: semester._id,
      students: studentIds,
    });
    await batch.save();
    return NextResponse.json(
      {
        message: "Batch created successfully",
        batch,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating batch", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = dbMiddleware(getBatches);
export const POST = dbMiddleware(postBatch);
