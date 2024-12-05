import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  batch: {
    type: Schema.Types.ObjectId,
    ref: "Batch",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
  },
  transactions: {
    type: [Schema.Types.ObjectId],
    ref: "Transaction",
  },
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

export const Student = models.Student || model("Student", studentSchema);
