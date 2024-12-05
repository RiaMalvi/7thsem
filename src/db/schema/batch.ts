import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const batchSchema = new Schema({
  batchId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4(),
  },
  program: {
    type: String,
    required: true,
    enum: ["BTECH", "MTECH", "MBA"],
  },
  year: {
    type: Number,
    required: true,
  },
  students: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Student",
  },
  semester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Semester",
  },
});

export const Batch = models.Batch || model("Batch", batchSchema);
