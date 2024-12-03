import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  batch: String,
  semester: Number,
  branch: String,
  email: String,
  phone: String,
  address: String,
  password: {
    type: String,
    required: true,
    max: 100,
    min: 8,
  },
});
export const Student = model("Student", studentSchema);
