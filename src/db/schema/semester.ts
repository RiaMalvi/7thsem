import { Schema, model, models } from "mongoose";

enum Program {
  BTECH = "BTECH",
  MTECH = "MTECH",
  MBA = "MBA",
}

const semesterSchema = new Schema({
  semesterId: {
    type: String,
    required: true,
    unique: true,
  },
  program: {
    type: String,
    required: true,
    enum: Object.values(Program),
  },
  semester: Number,
  feeDetails: {
    tuitionFee: {
      type: Number,
      required: true,
    },
    examFee: {
      type: Number,
      required: true,
    },
    libraryFee: {
      type: Number,
      required: true,
    },
    hostelFee: {
      type: Number,
      required: true,
    },
  },
  students: {
    type: [Schema.Types.ObjectId],
    ref: "Student",
  },
});

export const Semester = models.Semester || model("Semester", semesterSchema);
