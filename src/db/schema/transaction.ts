import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["PENDING", "COMPLETED", "FAILED"],
  },
});

export const Transaction =
  models.Transaction || model("Transaction", transactionSchema);
